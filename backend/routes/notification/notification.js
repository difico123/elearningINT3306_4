const express = require('express');
const Router = express.Router();
const ApiNotification = require('../../controllers/ApiNotification');
const auth = require('../../middleware/auth/auth');

// @route   GET api/notification/get
// @desc    get notification by user
// @access  Private
Router.get('/get', auth, ApiNotification.getNotification);

// @route   GET api/notification/delete/:notificationId
// @desc    Delete notification by user
// @access  Private
Router.delete('/delete/:notificationId', auth, ApiNotification.delNotification);

// @route   GET api/notification/setConfirm/:notificationId
// @desc    set confirm notification by user
// @access  Private
Router.put('/setConfirm/:notificationId', auth, ApiNotification.setConfirm);

// @route   GET api/notification/get
// @desc    get notification by user
// @access  Private
Router.get('/getNotSeenMsgs', auth, ApiNotification.getNotSeenMsgs);

module.exports = Router;
