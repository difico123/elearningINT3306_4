import http from "./httpService";

const apiEndpoint = "/api/auth";

function login({ email, password }) {
  const config = { headers: { 'Content-Type': 'application/json' } };
  return http.post(
    apiEndpoint + '/login',
    {
      email,
      password
    },
    config
  );
}
async function register(username, password, firstName, middleName) {
  return http.post(apiEndpoint + "/register", {
    username,
    password,
    firstName,
    middleName,
  });
}

async function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

function logout() {
  return http.get( apiEndpoint + '/logout' );
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
