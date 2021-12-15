import http from "./httpService";

const apiEndpoint = "http://localhost:7500/api/admin";

http.setJwt(getJwt());

async function login({ email, password }) {
  const config = { headers: { "Content-Type": "application/json" } };

  const data = await http.post(apiEndpoint + '/login', {
    email,
    password,
  },
    config);
  localStorage.setItem("token", data.token);
  localStorage.setItem("uuid", data.user.uuid);
  return data;
}

async function getCourseList(page) {
  return await http.get(apiEndpoint + `/listCourses/?page=${page}`);
}
async function getUserList(page) {
  return await http.get(apiEndpoint + `/listUsers/?page=${page}`);
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("uuid");
}

async function getAdmin() {
  return await http.get('http://localhost:7500/api/user/info');
}
function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  getUserList,
  getCourseList,
  getJwt,
  getAdmin
}
