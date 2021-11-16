const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');
const instructorAuth = require('../../middleware/auth/instructor.auth');
const ApiCourse = require('../../controllers/ApiCourse');
const upload = require('../../utils/multer');

//@route api/course/:courseId/topic
// router.use('/:courseId/topic', coursePassport, require('./topic'));

// @route   POST api/course/create/:categoryId
// @desc    Create course
// @access  Private
router.post(
    '/create/:categoryId',
    upload.single('courseImage'),
    auth,
    instructorAuth,
    ApiCourse.createCourse,
);

// @route   GET api/course/instructorCourses
// @desc    show instructor'courses
// @access  Private
router.get('/instructorCourses', auth, instructorAuth, ApiCourse.getCourses);

module.exports = router;
