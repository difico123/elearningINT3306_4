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

const { coursePassport } = require('../../middleware/passport');

//@route api/course/:courseId/topic
router.use('/:courseId/topic', coursePassport, require('./topic'));

// @route   POST api/course/create/:categoryId
// @desc    Create course
// @access  Private
router.post(
    '/create/:categoryId',
    categoryPassport,
    upload.single('courseImageUrl'),
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

// @route   GET api/course/instructorCourses/:courseId
// @desc    show instructor'courses details
// @access  Private
router.get(
    '/instructorCourses/:courseId',
    auth,
    courseInstructorAuth(true),
    coursePassport,
    ApiCourse.getCourseDetails,
);

// @route   PUT api/course/activate/:courseId
// @desc    Activate course
// @access  Private
router.put(
    '/activate/:courseId',
    auth,
    courseInstructorAuth(true),
    coursePassport,
    ApiCourse.activateCourse,
);

// @route   PUT api/course/suspend/:courseId
// @desc    suspend course
// @access  Private
router.put(
    '/suspend/:courseId',
    auth,
    courseInstructorAuth(true),
    coursePassport,
    ApiCourse.suspendCourse,
);

// @route   PUT api/course/edit/:courseId
// @desc    edit course
// @access  Private
router.put(
    '/edit/:courseId',
    upload.single('courseImageUrl'),
    checkCourseInput(['name', 'description']),
    validateInput,
    auth,
    courseInstructorAuth(true),
    coursePassport,
    ApiCourse.edit,
);

// @route   DELETE api/course/delete/:courseId
// @desc    Delete course
// @access  Private
router.delete(
    '/delete/:courseId',
    auth,
    courseInstructorAuth(true),
    coursePassport,
    ApiCourse.delete,
);

// @route   GET api/course/getUsers/:courseId
// @desc    Get all users in the course
// @access  private
router.get(
    '/getUsers/:courseId',
    auth,
    courseInstructorAuth(true),
    coursePassport,
    ApiCourse.showUsers,
);

// @route   PUT api/course/:courseId/kick/:userId
// @desc    Get all users in the course
// @access  private
router.put(
    '/:courseId/kick/:userId',
    auth,
    courseInstructorAuth(true),
    coursePassport,
    ApiCourse.kickUser,
);

// @route   PUT api/course/:courseId/invite/:userId
// @desc    Get all users in the course
// @access  private
router.post(
    '/:courseId/invite/:userId',
    auth,
    courseInstructorAuth(true),
    coursePassport,
    ApiCourse.invite,
);

// @route   PUT api/course/:courseId/findUsers
// @desc    findUsers
// @access  private
router.get(
    '/:courseId/findUsers',
    auth,
    courseInstructorAuth(true),
    coursePassport,
    ApiCourse.findUsers,
);

// @route   GET api/course/showAll
// @desc    Show all courses
// @access  public
router.get('/showAll', ApiCourse.showAll);


// @route   GET api/course/rank/:courseId
// @desc    Show all courses
// @access  public
router.get('/rank/:courseId', ApiCourse.rank);

// @route   GET api/course/showDetail/:courseId
// @desc    Show all courses
// @access  public
router.get('/showDetail/:courseId', coursePassport, ApiCourse.showDetail);

module.exports = router;
