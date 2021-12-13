const express = require('express');
const Router = express.Router();
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
const ApiChoice = require('../../controllers/ApiChoice');

// @route   POST api/course/:courseId/topic/:topicId/quiz/:quizId/question/:questionId/choice/create
// @desc    create a choice by instructor
// @access  Private
Router.post(
    '/create',
    auth,
    instructorAuth,
    checkCourseInput(['content']),
    validateInput,
    courseInstructorAuth(true),
    ApiChoice.createChoice,
);

// @route   GET api/course/:courseId/topic/:topicId/quiz/:quizId/question/:questionId/choice/getChoices
// @desc    get choices with questionId by instructor and student
// @access  Private
Router.get('/getChoices', auth, userCourseAuth, ApiChoice.getChoices);

module.exports = Router;
