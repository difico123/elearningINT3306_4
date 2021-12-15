const { Notification, User } = require('../db/models');
const NotificationService = require('../dbService/notificationService');

module.exports = class ApiNotification {
    // @route   GET api/notification/get
    // @desc    get notification by user
    // @access  Private
    static async getNotification(req, res) {
        let { id, role } = req.user;
        try {
            let notifications = {};
            if (role === 1) {
                notifications =
                    await NotificationService.getInstructorNotification(id);
            } else if (role === 0) {
                notifications =
                    await NotificationService.getStudentNotification(id);
            }

            // if(user.role === 1) {
            // } else {
            //     notifications = await NotificationService.getStudentNotification(id);
            // }

            if (notifications.length === 0) {
                return res.status(200).json({
                    error: false,
                    msg: ['Bạn không có thông báo nào'],
                });
            } else {
                for (let i = 0; i < notifications.length; i++) {
                    await Notification.findOne({
                        where: { id: notifications[i].id },
                    }).then(async (notification) => {
                        if (notification) {
                            await notification.update({
                                viewed: 1,
                            });
                        }
                    });
                }

                res.status(200).json({
                    error: false,
                    notifications: notifications,
                    numOfNotifications: notifications.length,
                });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/notification/getNotSeenMsg
    // @desc    get msg not seen
    // @access  Private
    static async getNotSeenMsgs(req, res) {
        let { id, role } = req.user;
        try {
            let notifications = {};
            if (role === 1) {
                notifications = await NotificationService.getInstructorWatch(
                    id,
                );
            } else if (role === 0) {
                notifications = await NotificationService.getStudentWatch(id);
            }
            res.status(200).json({
                error: false,
                num: notifications[0].NotSeen,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   DELETE api/notification/delete/:notificationId
    // @desc    Delete notification by user
    // @access  Private
    static async delNotification(req, res) {
        let { notificationId } = req.params;
        try {
            let notifications = await Notification.findOne({
                where: { id: notificationId },
            });
            await notifications.destroy();
            res.status(200).json({
                error: false,
                msg: ['Bạn đã xoá thông báo này'],
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
    // @route   PUT api/notification/setConfirm/:notificationId
    // @desc    set confirm notification by user
    // @access  Private
    static async setConfirm(req, res) {
        let { notificationId } = req.params;
        try {
            await Notification.findOne({ where: { id: notificationId } }).then(
                async (notification) => {
                    if (notification) {
                        await notification
                            .update({
                                isConfirmed: 1,
                            })
                            .then(() => {
                                res.status(200).json({
                                    error: false,
                                    msg: ['Bạn thông báo này đã xác nhận'],
                                });
                            });
                    }
                },
            );
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
