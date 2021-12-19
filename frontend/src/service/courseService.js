import http from "./httpService";

const apiEndpoint = "/api/course";

async function findUsers(courseId, UserEmail) {
  return await http.get(apiEndpoint + `/${courseId}/findUsers?keyword=${UserEmail}`);
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

async function rank(courseId) {
  return await http.get(apiEndpoint + `/rank/${courseId}`);
}

function getInstructorCourses(keyword, page=1) {
  keyword = !keyword ? "" : `&keyword=${keyword}`;
  return http.get(apiEndpoint + `/instructorCourses?page=${page}${keyword}`);
}

async function getEnrollTopics(courseId) {
  return await http.get(apiEndpoint + `/showDetail/${courseId}`);
}

function suspendCourse(courseId) {
  return http.put(apiEndpoint + `/suspend/${courseId}`);
}

function activateCourse(courseId) {
  return http.put(apiEndpoint + `/activate/${courseId}`);
}

async function editCourse(courseId, body) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  return await http.put(apiEndpoint + `/edit/${courseId}`, body, config);
}

async function deleteCourse(courseId) {
  return await http.delete(apiEndpoint + `/delete/${courseId}`);
}

function kickUser(courseId, userId) {
  return http.put(apiEndpoint + `/${courseId}/kick/${userId}`);
}

function inviteStudent(courseId,studentId) {
  return http.post(apiEndpoint + `/${courseId}/invite/${studentId}`);
}

async function createCourse(categoryId, body) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  return await http.post(apiEndpoint + `/create/${categoryId}`, body, config);
}

async function createTopic(courseId, body) {
  const config = { headers: { "Content-Type": "application/json" } };
  return await http.post(apiEndpoint + `/${courseId}/topic/create`, body, config);
}

function getCourseUsers(courseId, page = 1) {
  return http.get(apiEndpoint + `/getUsers/${courseId}?page=${page}`);
}

function getInstructorCourseDetails(courseId) {
  return http.get(apiEndpoint + `/instructorCourses/${courseId}`);
}

async function getTopicDetails(courseId, topicId) {
  return await http.get(apiEndpoint + `/${courseId}/topic/getSingleTopic/${topicId}`);
}

async function getCourseTopics(courseId) {
  return await http.get(apiEndpoint + `/${courseId}/topic/getCourseTopics`);
}
async function getTopicNames(courseId) {
  return await http.get(apiEndpoint + `/${courseId}/topic/getTopicNames`);
}
async function deleteTopic(courseId,topicId) {
  return await http.delete(apiEndpoint + `/${courseId}/topic/delete/${topicId}`);
}
async function editTopic(courseId,topicId, body) {
  const config = { headers: { "Content-Type": "application/json" } };
  return await http.put(apiEndpoint + `/${courseId}/topic/edit/${topicId}`, body, config);
}

export default {
  findUsers,
  getAll,
  getInstructorCourses,
  suspendCourse,
  activateCourse,
  editCourse,
  deleteCourse,
  inviteStudent,
  createCourse,
  createTopic,
  getEnrollTopics,
  getCourseUsers,
  getInstructorCourseDetails,
  getTopicDetails,
  kickUser,
  getCourseTopics,
  deleteTopic,
  getTopicNames,
  editTopic,
  rank
};