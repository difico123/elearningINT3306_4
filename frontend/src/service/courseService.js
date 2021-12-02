import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = "/api/course";

function findUsers(courseId, UserEmail) {
  return http.get(apiEndpoint + `/${courseId}/findUsers?keyword=${UserEmail}`);
}

async function getAll(categoryId, keyword, rating, page) {
  let query;
  keyword = !keyword ? "" : `keyword=${keyword}`;
  page = !page ? "" : `&page=${page}`;
  rating = !rating ? "" : `&rating=${rating}`;
  categoryId = !categoryId ? "" : `&categoryId=${categoryId}`;
  query =
    !keyword && !page && !rating && !categoryId
      ? ""
      : `?${keyword}${page}${rating}${categoryId}`;
  return await http.get(apiEndpoint + `/showAll${query}`);
}
function getInstructorCourses() {
  return http.get(apiEndpoint + `/instructorCourses`);
}

function suspendCourse(courseId) {
  return http.put(apiEndpoint + `/suspend/${courseId}`);
}

function activateCourse(courseId) {
  return http.put(apiEndpoint + `/activate/${courseId}`);
}

function editCourse(courseId) {
  return http.put(apiEndpoint + `/edit/${courseId}`);
}

function deleteCourse(courseId) {
  return http.put(apiEndpoint + `/delete/${courseId}`);
}

export default {
  findUsers,
  getAll,
  getInstructorCourses,
  suspendCourse,
  activateCourse,
  editCourse,
  deleteCourse
};