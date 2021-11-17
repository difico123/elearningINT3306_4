const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');
const {
    courseInstructorAuth,
} = require('../../middleware/auth/courseInstructor.auth');
const instructorAuth = require('../../middleware/auth/instructor.auth');
const ApiCourse = require('../../controllers/ApiCourse');
const upload = require('../../utils/multer');
const { categoryPassport } = require('../../middleware/passport');
const {
    checkCourseInput,
    validateInput,
} = require('../../middleware/errors/Validate');

//@route api/course/:courseId/topic
// router.use('/:courseId/topic', coursePassport, require('./topic'));

// @route   POST api/course/create/:categoryId
// @desc    Create course
// @access  Private
router.post(
    '/create/:categoryId',
    categoryPassport,
    upload.single('courseImage'),
    checkCourseInput(['name', 'description']),
    validateInput,
    auth,
    instructorAuth,
    ApiCourse.createCourse,
);

// @route   GET api/course/instructorCourses
// @desc    show instructor'courses
// @access  Private
router.get('/instructorCourses', auth, instructorAuth, ApiCourse.getCourses);

// @route   PUT api/course/activate/:courseId
// @desc    Activate course
// @access  Private
router.put(
    '/activate/:courseId',
    auth,
    courseInstructorAuth(true),
    ApiCourse.activateCourse,
);

// @route   PUT api/course/suspend/:courseId
// @desc    suspend course
// @access  Private
router.put(
    '/suspend/:courseId',
    auth,
    courseInstructorAuth(true),
    ApiCourse.suspendCourse,
);

// @route   PUT api/course/edit/:courseId
// @desc    edit course
// @access  Private
router.put(
    '/edit/:courseId',
    upload.single('courseImage'),
    checkCourseInput(['name', 'description']),
    validateInput,
    auth,
    courseInstructorAuth(true),
    ApiCourse.edit,
);

module.exports = router;
