const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');
const {
    courseInstructorAuth,
} = require('../../middleware/auth/courseInstructor.auth');
const instructorAuth = require('../../middleware/auth/instructor.auth');
const ApiTopic = require('../../controllers/ApiTopic');
const upload = require('../../utils/multer');
const { categoryPassport } = require('../../middleware/passport');
const {
    checkCourseInput,
    validateInput,
} = require('../../middleware/errors/Validate');

const userCourseAuth = require('../../middleware/auth/userCourse.auth');

// @route api/course/:courseId/topic/:topicId/quiz
// router.use(
//     '/:topicId/quiz',
//     topicPassport,
//     topicCourseAuth,
//     require('./quizes'),
// );

// @route   POST api/course/:courseId/topic/create
// @desc    create topic by instructor
// @access  Private
router.post(
    '/create',
    checkCourseInput(['title','content']),
    validateInput,
    auth,
    courseInstructorAuth(true),
    ApiTopic.createTopic
);

// @route   GET api/course/:courseId/topic/getCourseTopics
// @desc    get All course topic
// @access  Private
router.get('/getCourseTopics', auth, userCourseAuth, ApiTopic.getCourseTopics);

// @route   GET api/course/:courseId/topic/edit/:topicId
// @desc    edit Topics
// @access  Private
router.put(
    '/edit/:topicId',
    auth,
    instructorAuth,
    courseInstructorAuth,
    // topicCourseAuth,
    ApiTopic.editTopic,
);

// @route   GET api/course/:courseId/topic/changeOrder/:topicId
// @desc    edit Topic
// @access  Private
router.put(
    '/changeOrder/:topicId',
    validateInput,
    // topicCourseAuth,
    auth,
    instructorAuth,
    courseInstructorAuth,
    ApiTopic.changeOrder,
);

// @route   delete api/course/:courseId/topic/delete/:topicId
// @desc    delete Topic
// @access  Private
router.delete(
    '/delete/:topicId',
    auth,
    instructorAuth,
    courseInstructorAuth,
    // topicCourseAuth,
    ApiTopic.deleteTopic,
);

module.exports = router;
