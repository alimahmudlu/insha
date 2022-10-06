var token = localStorage.professionJWT;
var uid   = localStorage.uid

export const initialState = {
	user: {},
	token: '' || token,
	uid: '' || uid,
	loading: false,
	errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'CURRENT_USER':
			return {
				...initialState,
				user: action.user,
				loading: false,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				user: action.user,
				token: action.user.token,
				loading: false,
			};
		case 'TOKEN_UNCORRECT':
			return {
				...initialState,
				user: '',
				token: '',
				uid: '',
				loading: false
			};
		case 'LOGOUT':
			return {
				...initialState,
				user: '',
				uid: '',
				token: '',
			};

		case 'LOGIN_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
