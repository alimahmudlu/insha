// HELPERS
import { setAuthorizationHeader, api } from './../Helper';

export const loginUser = (dispatch, credentials) => new Promise((resolve, reject) => {
    dispatch({ type: 'REQUEST_LOGIN' });
    api.user.login(credentials).then(data => {
        if (data.success && data.user) {
            localStorage.professionJWT  = data.user[0].token;
            localStorage.uid            = data.user[0].id;
            setAuthorizationHeader(data.user[0].token, data.user[0].id);
            dispatch({ type: 'LOGIN_SUCCESS', user: data.user[0] });
            return resolve(data.user);
        }
        dispatch({ type: 'LOGIN_ERROR', error: ((data.response || {}).data || {}).error || data.message });
        return reject(data.error);
    }).catch(error => {
        dispatch({ type: 'LOGIN_ERROR', error: ((error.response || {}).data || {}).error || error.message });
        return reject(error);
    });
});

export const checkToken = (dispatch) => new Promise((resolve, reject) => {
    dispatch({ type: 'REQUEST_LOGIN' });
    api.user.control().then(data => {
        if (data.user) {
            dispatch({ type: 'CURRENT_USER', user: data.user[0] });
            resolve(data.user);
        } else {
            dispatch({ type: 'TOKEN_UNCORRECT' });
            reject(data.error);
        }
    }).catch(error => {
        if ((error.response || {}).status === 401)
            dispatch({ type: 'TOKEN_UNCORRECT' });
        reject(error);
    });
});


export function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    setAuthorizationHeader();
    localStorage.removeItem('uid');
    localStorage.removeItem('professionJWT');
}
