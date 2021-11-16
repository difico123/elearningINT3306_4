import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";

http.setJwt(getJwt());

async function login(username, password) {
    return http.post(apiEndpoint + '/login', {
        username,
        password,
    })
}
async function register(username, password, firstName, middleName) {
    return http.post(apiEndpoint + '/register', {
        username,
        password,
        firstName,
        middleName,
    })
}


async function loginWithJwt(jwt) {
    localStorage.setItem("token", jwt);
}

function logout() {
    localStorage.removeItem("token");
}


function getJwt() {
    return localStorage.getItem("token");
}

export default {
    login,
    loginWithJwt,
    logout,
    getJwt,
};