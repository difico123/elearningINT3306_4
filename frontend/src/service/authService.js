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
async function register(user) {
  const config = { headers: { "Content-Type": "application/json" } };
  return http.post(apiEndpoint + "/register", user, config);
}

function logout() {
  return http.get(apiEndpoint + "/logout");
}

async function forgotPassword(email) {
  const config = { headers: { "Content-Type": "application/json" } };
  return await http.post(apiEndpoint + "/forgotPassword", email, config);
}

export default {
  login,
  logout,
  register,
  forgotPassword,
};
