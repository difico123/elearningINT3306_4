import http from "./httpService";

const apiEndpoint = "/api/course";

function createQuiz(courseId, topicId, body) {
const config = { headers: { "Content-Type": "application/json" } };
return http.post(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/create`, body , config);
}

function activeQuiz(courseId,topicId,quizId) {
  return http.put(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/active/${quizId}`);
}
function hideQuiz(courseId,topicId,quizId) {
  return http.put(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/hide/${quizId}`);
}

function editQuiz(courseId, topicId, quizId, body) {
  const config = { headers: { "Content-Type": "application/json" } };
  return http.put(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/edit/${quizId}`, body, config);
}

async function delQuiz(courseId, topicId, quizId) {
  return await http.delete(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/delete/${quizId}`);
}

function getQuizNames(courseId, topicId, page = 1) {
  return http.get(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/getQuizeNames?page=${page}`);
}

function getQuizTitles(courseId, topicId) {
  return http.get(
    apiEndpoint + `/${courseId}/topic/${topicId}/quiz/getQuizeTitles`
  );
}

function createQuestion(courseId, topicId,quizId, body) {
  const config = { headers: { "Content-Type": "application/json" } };
  return http.post(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/${quizId}/question/create`, body , config);
  }
function editQuestion(courseId, topicId,quizId, questionId, body) {
  const config = { headers: { "Content-Type": "application/json" } };
  return http.put(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/${quizId}/question/edit/${questionId}`, body , config);
}

function deleteQuestion(courseId, topicId,quizId, questionId) {
  const config = { headers: { "Content-Type": "application/json" } };
  return http.delete(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/${quizId}/question/delete/${questionId}` , config);
  }

function createAnswer(courseId, topicId,quizId, questionId, body) {
  const config = { headers: { "Content-Type": "application/json" } };
  return http.post(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/${quizId}/question/${questionId}/choice/create`, body , config);
}

function editAnswer(courseId, topicId,quizId, questionId, choiceId, body) {
  const config = { headers: { "Content-Type": "application/json" } };
  return http.put(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/${quizId}/question/${questionId}/choice/edit/${choiceId}`, body , config);
}

function deleteAnswer(courseId, topicId,quizId, questionId,choiceId) {
  const config = { headers: { "Content-Type": "application/json" } };
  return http.delete(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/${quizId}/question/${questionId}/choice/delete/${choiceId}` , config);
}

async function getInstructorQuestions(courseId, topicId, quizId) {
  return await http.get(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/getInstructorQuestions/${quizId}`);
}

async function getStudentQuestions(courseId, topicId,quizId) {
  return await http.get(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/getStudentQuestions/${quizId}`);
}

async function getQuestionIds(courseId, topicId,quizId) {
  return await http.get(apiEndpoint + `/${courseId}/topic/${topicId}/quiz/getQuestionIds/${quizId}`);
}

export default { 
  createQuiz, 
  activeQuiz, 
  hideQuiz, 
  getQuizNames,
  editQuiz, 
  delQuiz, 
  getQuizTitles, 
  createQuestion, 
  createAnswer,
  getInstructorQuestions,
  getStudentQuestions,
  editQuestion, 
  deleteQuestion, 
  editAnswer,
  deleteAnswer,
  getQuestionIds
};