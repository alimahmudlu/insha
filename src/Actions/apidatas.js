// PACKETS
import axios from "axios";
import _ from "lodash";

// HELPERS
import { showToast } from "../Helper/functions/toast"


export const getCachedApi = (url, apiDatas, dispatch, config, cached, callBack) => {
    if (cached && !_.isEmpty(apiDatas[url])) {
        callBack(apiDatas[url]);
    } else {
        axios.get(url, config).then(res => {
            if (res.data.success) {
                if (cached) {
                    dispatch({ type: 'ADD_DATA', key: url, data: res.data });
                }
                callBack(res.data);
            } else {
                showToast(res.data.message);
                callBack({...res.data, data: []});
            }
        }).catch(error => console.log('Actions / getCachedApi ERROR:', error));
    }
};

export const postCachedApi = (url, apiDatas, dispatch, credentials, cached, callBack) => {
    if (cached && !_.isEmpty(apiDatas[url])) {
        callBack(apiDatas[url]);
    } else {
        axios.post(url, credentials).then(res => {
            if (res.data.success) {
                if (cached) {
                    dispatch({ type: 'ADD_DATA', key: url, data: res.data });
                }
                callBack(res.data);
            } else {
                showToast(res.data.message)
            }
        }).catch(error => console.log('Actions / postCachedApi ERROR:', error));
    }
};

export const putCachedApi = (url, apiDatas, dispatch, credentials, cached, callBack) => {
    if (cached && !_.isEmpty(apiDatas[url])) {
        callBack(apiDatas[url]);
    } else {
        axios.put(url, credentials).then(res => {
            if (res.data.success) {
                if (cached) {
                    dispatch({ type: 'ADD_DATA', key: url, data: res.data });
                }
                callBack(res.data);
            } else {
                showToast(res.data.message)
            }
        }).catch(error => console.log('Actions / putCachedApi ERROR:', error));
    }
};

export const deleteCachedApi = (url, apiDatas, dispatch, credentials, cached, callBack) => {
    if (cached && !_.isEmpty(apiDatas[url])) {
        callBack(apiDatas[url]);
    } else {
        axios.delete(url, credentials).then(res => {
            if (res.data.success) {
                if (cached) {
                    dispatch({ type: 'ADD_DATA', key: url, data: res.data });
                }
                callBack(res.data);
            } else {
                showToast(res.data.message)
            }
        }).catch(error => console.log('Actions / putCachedApi ERROR:', error));
    }
};
