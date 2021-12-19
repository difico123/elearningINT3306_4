const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');
const ApiUserCourse = require('../../controllers/ApiUserCourse');
const {
    courseInstructorAuth,
} = require('../../middleware/auth/courseInstructor.auth');
const userCourseAuth = require('../../middleware/auth/userCourse.auth');
const instructorAuth = require('../../middleware/auth/instructor.auth');
const {
    checkCourseInput,
    validateInput,
} = require('../../middleware/errors/Validate');

// @route   POST api/userCourse/enroll/:courseId
// @desc    enroll a course by student
// @access  private
router.put(
    '/enroll/:courseId',
    auth,
    courseInstructorAuth(false),
    ApiUserCourse.checkEnrollCourse,
    ApiUserCourse.enroll,
);

// @route   GET api/userCourse/enroll/check/:courseId
// @desc    check enroll a course by student
// @access  private
router.get('/enroll/check/:courseId', auth, ApiUserCourse.checkEnrollCourse);

// @route   GET api/userCourse/enroll/check/:courseId
// @desc    check enroll a course by student
// @access  private
// router.get(
//     '/enroll/check/:courseId',
//     auth,
//     courseInstructorAuth(false),
//     ApiUserCourse.checkBtnEnrollCourse,
// );

// @route   GET api/userCourse/check/:courseId
// @desc    check enroll a course
// @access  private
router.get('/check/:courseId', auth, ApiUserCourse.checkCourse);

// @route   GET api/userCourse/checkInstructor/:courseId
// @desc    check instructor enroll a course
// @access  private
router.get(
    '/checkInstructor/:courseId',
    auth,
    instructorAuth,
    ApiUserCourse.checkInstructorEnroll,
);

// @route   Get api/userCourse/all
// @desc    get the list of user courses
// @access  private
router.get('/all', auth, ApiUserCourse.getAll);

// @route   Get api/userCourse/all
// @desc    get the list of user courses
// @access  private
router.get('/:courseId', auth, ApiUserCourse.getSingleCourse);

// @route   Get api/userCourse/all
// @desc    get the list of user courses
// @access  private
router.get('/all/:courseId', auth, ApiUserCourse.getCourseScore);

// @route   POST api/userCourse/rate/:courseId
// @desc    rate the course
// @access  private
router.put(
    '/rate/:courseId/:rating',
    [checkCourseInput(['rating'])],
    validateInput,
    auth,
    courseInstructorAuth(false),
    userCourseAuth,
    ApiUserCourse.rate,
);

// @route   POST api/userCourse/getRating/:courseId
// @desc    rate the course
// @access  private
router.get(
    '/getRating/:courseId',
    validateInput,
    auth,
    userCourseAuth,
    ApiUserCourse.getRating,
);

module.exports = router;
