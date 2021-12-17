const express = require('express');
const router = express.Router();
const ApiAdmin = require('../../controllers/ApiAdmin');
const auth = require('../../middleware/auth/auth');
const admin = require('../../middleware/auth/admin.auth');
const {
    checkUserInput,
    validateInput,
} = require('../../middleware/errors/Validate');
// @route   POST api/admin/login
// @desc    login user
// @access  Public
router.post(
    '/login',
    checkUserInput(['email', 'password']),
    validateInput,
    ApiAdmin.login,
);

// @route   DELETE api/admin/deleteUser/:userId
// @desc    Delete user by admin
// @access  Private
router.delete('/deleteUser/:userId', auth, admin, ApiAdmin.deleteUser);

// @route   DELETE api/admin/deleteCourse/:courseId
// @desc    Delete course by admin
// @access  Private
router.delete('/deleteCourse/:courseId', auth, admin, ApiAdmin.deleteCourse);

// @route   GET api/admin/listUsers
// @desc    get users by admin
// @access  Private
router.get('/listUsers', auth, admin, ApiAdmin.listUsers);

// @route   GET api/admin/setInstructor/:userId
// @desc    set users by admin be instructor
// @access  Private
router.put('/setInstructor/:userId', auth, admin, ApiAdmin.beInstructor);

// @route   GET api/admin/statistic
// @desc    get users by admin
// @access  Private
router.get('/statistic', auth, admin, ApiAdmin.statistic);

// @route   GET api/admin/listCourses
// @desc    get listCourses by admin
// @access  Private
router.get('/listCourses', auth, admin, ApiAdmin.listCourses);

module.exports = router;
