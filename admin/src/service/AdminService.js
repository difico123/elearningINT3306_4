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

async function getCourseList() {
  return await http.get(apiEndpoint + `/listCourses`);
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

async function setInstructor(userId) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  return await http.put(apiEndpoint + `/setInstructor/${userId}`, config);
}

async function deleteUser(userId) {
  return await http.delete(apiEndpoint + `/delete/${userId}`);
}

async function deleteCourse(courseId) {
  return await http.delete(apiEndpoint + `/deleteCourse/${courseId}`);
}

async function getAll() {
  return await http.get(apiEndpoint + `/statistic`);
}

export default {
  login,
  logout,
  getUserList,
  getCourseList,
  getJwt,
  getAdmin,
  setInstructor,
  deleteCourse,
  deleteUser,
  getAll
}
