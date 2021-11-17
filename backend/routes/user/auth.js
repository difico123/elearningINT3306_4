const express = require('express');
const router = express.Router();
const upload = require('../../utils/multer');
const ApiUser = require('../../controllers/ApiUser');
const {
    checkUserInput,
    validateInput,
} = require('../../middleware/errors/Validate');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
    '/register',
    upload.single('imageUrl'),
    checkUserInput([
        'firstName',
        'lastName',
        'email',
        'password',
        'address',
        'city',
        'phoneNumber',
    ]),
    validateInput,
    ApiUser.register,
);

// @route   POST api/auth/login
// @desc    login user
// @access  Public
router.post(
    '/login',
    checkUserInput(['email', 'password']),
    validateInput,
    ApiUser.login,
);

// @route   GET api/auth/logout
// @desc    logout user
// @access  private
router.get('/logout', ApiUser.logout);

// @route   POST api/auth/forgotPassword
// @desc    forgot user password
// @access  Public
router.post(
    '/forgotPassword',
    checkUserInput(['email']),
    validateInput,
    ApiUser.forgotPassword,
);

// @route   POST api/auth/resetPassword/:token
// @desc    reset user password
// @access  Public
router.post(
    '/resetPassword/:token',
    checkUserInput(['newPassword', 'confirmPassword']),
    validateInput,
    ApiUser.resetPassword,
);

module.exports = router;
