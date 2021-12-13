const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');
const {
    courseInstructorAuth,
} = require('../../middleware/auth/courseInstructor.auth');
const instructorAuth = require('../../middleware/auth/instructor.auth');
const ApiQuizes = require('../../controllers/ApiQuizes');
const {
    checkCourseInput,
    validateInput,
} = require('../../middleware/errors/Validate');
const { quizTopicAuth } = require('../../middleware/course.auth');
const userCourseAuth = require('../../middleware/auth/userCourse.auth');
const { quizPassport } = require('../../middleware/passport');

// @route api/course/:courseId/topic/:topicId/quiz/:quizId/question
router.use(
    '/:quizId/question',
    quizPassport,
    quizTopicAuth,
    require('./question'),
);

// @route   POST api/course/:courseId/topic/:topicId/quiz/create
// @desc    create quize by instructor
// @access  Private
router.post(
    '/create',
    auth,
    instructorAuth,
    checkCourseInput(["title"]),
    validateInput,
    courseInstructorAuth(true),
    ApiQuizes.createQuiz,
);

// @route   POST api/course/:courseId/topic/:topicId/quiz/active/:quizId
// @desc    active quiz by instructor
// @access  Private
router.put(
    '/active/:quizId',
    auth,
    instructorAuth,
    courseInstructorAuth(true),
    quizTopicAuth,
    ApiQuizes.showQuiz,
);

// @route   POST api/course/:courseId/topic/:topicId/quiz/hide/:quizId
// @desc    active quiz by instructor
// @access  Private
router.put(
    '/hide/:quizId',
    auth,
    instructorAuth,
    courseInstructorAuth(true),
    quizTopicAuth,
    ApiQuizes.hideQuiz,
);

// @route   GET api/course/:courseId/topic/:topicId/quiz/getQuizes
// @desc    get quizzes by instructor and student
// @access  Private
router.get('/getQuizes', auth, userCourseAuth, ApiQuizes.getquizes);

// @route   GET api/course/:courseId/topic/:topicId/quiz/getQuizeNames
// @desc    get quizzes by instructor and student
// @access  Private
router.get('/getQuizeNames', auth, userCourseAuth, ApiQuizes.getQuizNames);

// @route   GET /api/course/:courseId/topic/:topicId/quiz/getQuizScore/:quizId
// @desc    rank quiz
// @access  Private
router.get(
    '/getQuizScore/:quizId',
    quizPassport,
    auth,
    userCourseAuth,
    // ApiUserQuestion.getQuizScore,
);

module.exports = router;
