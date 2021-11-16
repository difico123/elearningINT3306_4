const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');
<<<<<<< HEAD
const courseInstructorAuth = require('../../middleware/auth/courseInstructor.auth');
const instructorAuth = require('../../middleware/auth/instructor.auth');
const ApiCourse = require('../../controllers/ApiCourse');
const upload = require('../../utils/multer');
const {
    checkCourseInput,
    validateInput,
} = require('../../middleware/errors/Validate');
=======
const instructorAuth = require('../../middleware/auth/instructor.auth');
const ApiCourse = require('../../controllers/ApiCourse');
const upload = require('../../utils/multer');
>>>>>>> 821a4b9 (init express sequelize mysql)

//@route api/course/:courseId/topic
// router.use('/:courseId/topic', coursePassport, require('./topic'));

// @route   POST api/course/create/:categoryId
// @desc    Create course
// @access  Private
router.post(
    '/create/:categoryId',
    upload.single('courseImage'),
<<<<<<< HEAD
    checkCourseInput(['name','description']),
    validateInput,
=======
>>>>>>> 821a4b9 (init express sequelize mysql)
    auth,
    instructorAuth,
    ApiCourse.createCourse,
);

// @route   GET api/course/instructorCourses
// @desc    show instructor'courses
// @access  Private
router.get('/instructorCourses', auth, instructorAuth, ApiCourse.getCourses);

<<<<<<< HEAD
// @route   PUT api/course/activate/:courseId
// @desc    Activate course
// @access  Private
router.put(
    '/activate/:courseId',
    auth,
    courseInstructorAuth,
    ApiCourse.activateCourse,
);

// @route   PUT api/course/suspend/:courseId
// @desc    suspend course
// @access  Private
router.put(
    '/suspend/:courseId',
    auth,
    courseInstructorAuth,
    ApiCourse.suspendCourse,
);

// @route   PUT api/course/edit/:courseId
// @desc    edit course
// @access  Private
router.put(
    '/edit/:courseId',
    upload.single('courseImage'),
    checkCourseInput(['name','description']),
    validateInput,
    auth,
    courseInstructorAuth,
    ApiCourse.edit,
);

=======
>>>>>>> 821a4b9 (init express sequelize mysql)
module.exports = router;
