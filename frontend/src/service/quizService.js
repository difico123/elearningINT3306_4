import http from "./httpService";

const apiEndpoint = "/api/course";

function createQuiz(courseId,topicId) {
const config = { headers: { "Content-Type": "application/json" } };
return http.post(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/create`,config);
}

function activeQuiz(courseId,topicId,quizId) {
  return http.put(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/active/${quizId}`);
}
function hideQuiz(courseId,topicId,quizId) {
  return http.put(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/hide/${quizId}`);
}

function getQuizNames(courseId, topicId) {
  return http.get(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/getQuizeNames`);
}

export default { createQuiz, activeQuiz, hideQuiz, getQuizNames };