const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');
const ApiUserQuestion = require('../../controllers/ApiUserQuestion');
const userCourseAuth = require('../../middleware/auth/userCourse.auth');
const { checkAnswerQuestion } = require('../../middleware/passport');

// @route   POST /api/course/:courseId/topic/:topicId/quiz/:quizId/question/:questionId/userquestion/answer/:choiceId
// @desc    answer a question by student
// @access  Private
router.post('/answer/:choiceId', auth, userCourseAuth, ApiUserQuestion.answerQuestion);


module.exports = router;
