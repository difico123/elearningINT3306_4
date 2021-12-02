const { Notification } = require('../db/models');
const NotificationService = require('../dbService/notificationService');

module.exports = class ApiNotification {
    // @route   GET api/notification/get
    // @desc    get notification by user
    // @access  Private
    static async getNotification(req, res) {
        let { id } = req.user;
        try {
            let notifications = await NotificationService.getNotification(id);
            if (notifications.length === 0) {
                return res.status(200).json({
                    error: false,
                    msg: ['Bạn không có thông báo nào'],
                });
            } else {
                for(let i = 0; i < notifications.length; i++) {
                    await Notification.findOne({ where: { id: notifications[i].id } }).then(async(notification) =>{
                        if (notification) {
                            await notification.update({
                                viewed: 1
                            })
                        }
                    })
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
    // @access  Public
     static async getNotSeenMsgs(req, res) {
         let {id} = req.user;
        try {
            let notifications = await NotificationService.getWatch(id)
            res.status(200).json({
                error: false,
                num: notifications[0].NotSeen,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
