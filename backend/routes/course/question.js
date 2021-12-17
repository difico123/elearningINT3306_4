const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');
const {
    courseInstructorAuth,
} = require('../../middleware/auth/courseInstructor.auth');
const instructorAuth = require('../../middleware/auth/instructor.auth');
const {
    checkCourseInput,
    validateInput,
} = require('../../middleware/errors/Validate');
const { questionQuizAuth } = require('../../middleware/course.auth');
const userCourseAuth = require('../../middleware/auth/userCourse.auth');
const { questionPassport } = require('../../middleware/passport');

const ApiQuestion = require('../../controllers/ApiQuestion');

// @route api/course/:courseId/topic/:topicId/quiz/:quizId/question/:questionId/choice
router.use(
    '/:questionId/choice',
    questionPassport,
    questionQuizAuth,
    require('./choice'),
);

// @route api/course/:courseId/topic/:topicId/quiz/:quizId/question/:questionId/userquestion
router.use(
    '/:questionId/userquestion',
    questionPassport,
    questionQuizAuth,
    require('../usercourse/userquestion'),
);

// @route   POST api/course/:courseId/topic/:topicId/quiz/:quizId/question/create
// @desc    create question by instructor
// @access  Private
router.post(
    '/create',
    auth,
    instructorAuth,
    checkCourseInput(['content']),
    validateInput,
    courseInstructorAuth(true),
    ApiQuestion.createQuestion,
);

// @route   POST api/course/:courseId/topic/:topicId/quiz/:quizId/question/edit/:questionId
// @desc    edit question by instructor
// @access  Private
router.put(
    '/edit/:questionId',
    auth,
    instructorAuth,
    courseInstructorAuth(true),
    questionQuizAuth,
    checkCourseInput(['content']),
    validateInput,
    ApiQuestion.editQuestion,
);

// @route   POST api/course/:courseId/topic/:topicId/quiz/:quizId/question/delete/:questionId
// @desc    delete question by instructor
// @access  Private
router.delete(
    '/delete/:questionId',
    auth,
    instructorAuth,
    courseInstructorAuth(true),
    questionQuizAuth,
    ApiQuestion.deleteQuestion,
);

// @route   GET api/course/:courseId/topic/:topicId/quiz/:quizId/question/getQuestion
// @desc    get question with quizId by instructor and student
// @access  Private
router.get('/getQuestions', auth, userCourseAuth, ApiQuestion.getQuestions);

// @route   GET api/course/:courseId/topic/:topicId/quiz/:quizId/question/getQuestionAnswers/:questionId
// @desc    get questions and answers with quizId by instructor and student
// @access  Private
router.get(
    '/getQuestionAnswers/:questionId',
    auth,
    userCourseAuth,
    questionQuizAuth,
    ApiQuestion.getQuestionAnswers,
);

module.exports = router;
