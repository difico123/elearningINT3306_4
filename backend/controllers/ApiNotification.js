const {
    Notification,
} = require('../db/models');
module.exports = class ApiNotification {
    // @route   GET api/notification/get
    // @desc    get notification by user
    // @access  Private
    static async getNotification(req, res) {
        let {id} = req.user;
        try {
            let notifications =  await Notification.findAll( {where: { receiverId: id}});
            if (notifications.length === 0) {
                return res.status(200).json({
                    error: false,
                    msg: ['Bạn không có thông báo nào'],
                });
            } else {
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

    // @route   GET api/notification/setViewed/:notificationId
    // @desc    Set viewed user
    // @access  Public
    static setViewed(req, res) {
        try {
            NotificationService.setViewed(req.params.notificationId).then(
                (viewed) => {
                    if (viewed.length == 0) {
                        return res.status(400).json({ error: 'lỗi' });
                    }
                    res.status(200).json('Đã xem');
                },
            );
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
