import http from "./httpService";

const apiEndpoint = "/api/userCourse";

function enrollCourse(courseId) {
  return http.put(apiEndpoint + `/enroll/${courseId}`);
}

function getAll(page = 1) {
  console.log(page)
  return http.get(apiEndpoint + `/all?page=${page}`);

}

export default {
  enrollCourse,
  getAll
};