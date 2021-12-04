import http from "./httpService";

const apiEndpoint = "/api/userCourse";

function enrollCourse(courseId) {
  return http.put(apiEndpoint + `/enroll/${courseId}`);
}

export default { enrollCourse };