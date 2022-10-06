// PACKETS
import axios from "axios";

/**
 * @functionName SET AUTHORIZATION HEADER
 * @functionDescription Axios api funksiyasına header əlavə edir.
 */
const setAuthorizationHeader = (token = null, id=0) => {
    if (token) {
        axios.defaults.headers.common.authorization = `${token} ${id}`;
        axios.defaults.headers.common.uid = `${id}`;
    } else {
        delete axios.defaults.headers.common.authorization;
        delete axios.defaults.headers.common.uid;
    }
};

export default setAuthorizationHeader;
