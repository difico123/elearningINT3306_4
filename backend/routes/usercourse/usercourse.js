const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');
const ApiUserCourse = require('../../controllers/ApiUserCourse');
const {
    courseInstructorAuth,
} = require('../../middleware/auth/courseInstructor.auth');
const userCourseAuth = require('../../middleware/auth/userCourse.auth');
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
router.get(
    '/enroll/check/:courseId',
    auth,
    courseInstructorAuth(false),
    ApiUserCourse.checkEnrollCourse
);

// @route   Get api/userCourse/all
// @desc    get the list of user courses
// @access  private
router.get('/all', auth, ApiUserCourse.getAll);

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

module.exports = router;
