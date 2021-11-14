const express = require('express');
const router = express.Router();
const ApiUser = require('../../controllers/ApiUser');
const auth = require('../../middleware/auth/auth');
const upload = require('../../utils/multer');
const {
    checkUserInput,
    validateInput,
} = require('../../middleware/errors/Validate');

// @route   GET api/user/info
// @desc    User information
// @access  Private
router.get('/info', auth, ApiUser.getInfor);

// @route   PUT api/user/editInfo
// @desc    Edit user information
// @access  Private
router.put(
    '/editInfo',
    upload.single('imageUrl'),
    checkUserInput([
        'firstName',
        'middleName',
        'lastName',
        'phoneNumber',
        'address',
        'city',
    ]),
    validateInput,
    auth,
    ApiUser.editInfo,
);

// @route   PUT api/user/beALecturer
// @desc    to be an instructor
// @access  Private
router.put('/beALecturer', auth, ApiUser.beALecturer);

// @route   PUT api/user/editPw
// @desc    edit user password
// @access  private
router.put(
    '/editPw',
    auth,
    checkUserInput(['password', 'newPassword', 'confirmPassword']),
    validateInput,
    ApiUser.checkCorrectPassword,
    ApiUser.editPw,
);

module.exports = router;
