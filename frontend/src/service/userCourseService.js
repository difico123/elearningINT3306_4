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

export default { enrollCourse, checkEnrollCourse,checkCourse };