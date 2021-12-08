import http from "./httpService";

const apiEndpoint = "/api/userCourse";

function enrollCourse(courseId) {
  return http.put(apiEndpoint + `/enroll/${courseId}`);
}

function checkEnrollCourse(courseId) {
  return http.get(apiEndpoint + `/enroll/check/${courseId}`);
}

function checkCourse(courseId) {
  return http.get(apiEndpoint + `/check/${courseId}`);
}

function getAll(page = 1) {
  return http.get(apiEndpoint + `/all?page=${page}`);

}
export default { enrollCourse, checkEnrollCourse,checkCourse,getAll };