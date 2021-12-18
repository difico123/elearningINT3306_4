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
function checkInstructorEnroll(courseId) {
  return http.get(apiEndpoint + `/checkInstructor/${courseId}`);
}

function getAll(page = 1) {
  return http.get(apiEndpoint + `/all?page=${page}`);
}

function Rate(courseId, rating) {
  return http.put(apiEndpoint + `/rate/${courseId}/${rating}`);
}
function getRating(courseId) {
  return http.get(apiEndpoint + `/getRating/${courseId}`);
}
export default {
  enrollCourse,
  checkEnrollCourse,
  checkCourse,
  getAll,
  checkInstructorEnroll,
  Rate,
  getRating
};