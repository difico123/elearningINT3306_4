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
const { choiceQuestionAuth } = require('../../middleware/course.auth');
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

// @route   PUT api/course/:courseId/topic/:topicId/quiz/:quizId/question/:questionId/choice/edit/:choiceId
// @desc    edit a choice by instructor
// @access  Private
Router.put(
    '/edit/:choiceId',
    auth,
    instructorAuth,
    choiceQuestionAuth,
    courseInstructorAuth(true),
    checkCourseInput(['content']),
    validateInput,
    ApiChoice.editChoice,
);

// @route   POST api/course/:courseId/topic/:topicId/quiz/:quizId/question/:questionId/choice/delete/:choiceId
// @desc    create a choice by instructor
// @access  Private
Router.delete(
    '/delete/:choiceId',
    auth,
    instructorAuth,
    choiceQuestionAuth,
    courseInstructorAuth(true),
    ApiChoice.deleteChoice,
);

// @route   GET api/course/:courseId/topic/:topicId/quiz/:quizId/question/:questionId/choice/getChoices
// @desc    get choices with questionId by instructor and student
// @access  Private
Router.get('/getChoices', auth, userCourseAuth, ApiChoice.getChoices);

module.exports = Router;
