const express = require('express');
const Router = express.Router();
const ApiNotification = require('../../controllers/ApiNotification');
const auth = require('../../middleware/auth/auth');

// @route   GET api/notification/get
// @desc    get notification by user
// @access  Private
Router.get('/get', auth, ApiNotification.getNotification);

// @route   PUT api/notification/setViewed/:notificationId
// @desc    Set viewed user
// @access  Public
Router.put('/setViewed/:notificationId', ApiNotification.setViewed);

module.exports = Router;
