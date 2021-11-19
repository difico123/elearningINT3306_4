import http from "./httpService";

const apiEndpoint = "/api/auth";

function login({ email, password }) {
  const config = { headers: { "Content-Type": "application/json" } };
  return http.post(
    apiEndpoint + "/login",
    {
      email,
      password,
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

function logout() {
  return http.get(apiEndpoint + "/logout");
}

export default {
  login,
  logout,
  register,
};
