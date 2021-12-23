import http from "./httpService";
import {apiUrl} from '../config.json'

const apiEndpoint =apiUrl+ "/api/auth";
http.setJwt(getJwt());

async function login({ email, password }) {
  const config = { headers: { "Content-Type": "application/json" } };

  const data = await http.post(apiEndpoint +'/login', {
    email,
    password,
  },
  config);
  localStorage.setItem("token", data.token);
  localStorage.setItem("uuid", data.user.uuid);
  return data;
}

async function register(user) {
  const config = { headers: { "Content-Type": "application/json" } };
  return http.post(apiEndpoint + "/register", user, config);
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("uuid");
}

async function forgotPassword(email) {
  const config = { headers: { "Content-Type": "application/json" } };
  return await http.post(apiEndpoint + "/forgotPassword", email, config);
}

function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  register,
  forgotPassword,
};
