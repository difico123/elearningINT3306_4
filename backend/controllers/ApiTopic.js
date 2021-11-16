const TopicService = require('../dbservice/TopicService');
const NotificationService = require('../dbservice/NotificationService');
const UserCourseService = require('../dbservice/UserCourseService');

module.exports = class ApiTopic {
    // @route   POST api/topic/create
    // @desc    Create topic
    // @access  Private
    static async createTopic(req, res) {
        const topic = {
            course: req.courseId,
            indexOrder: req.body.indexOrder,
            title: req.body.title,
            content: req.body.content,
        };
        try {
            TopicService.addTopic(topic).then((created) => {
                if (!created) {
                    return res.status(400).json({
                        error: true,
                        msg: 'Chưa tạo được topic',
                    });
                }

                const getUserPromise = UserCourseService.getCourseUsers(
                    topic.course,
                ).then(async (users) => {
                    if (users.length === 0) {
                        console.log({
                            msg: 'Không học sinh nào trong khoá học này',
                        });
                    } else {
                        await users.map((user) => {
                            let notification = {
                                user: user.userId,
                                topic: 'Thông báo topic của khoá học',
                                details: `${user.instructorName} vừa tạo thêm topic trong khoá học ${user.courseName} của thầy ấy`,
                            };
                            NotificationService.addNotification(notification);
                        });
                    }
                });

                Promise.all([getUserPromise]).then((values) => {
                    return res.status(200).json({
                        error: false,
                        msg: 'Tạo topic thành công',
                        topic,
                    });
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/topic/getCourseTopics
    // @desc    get All topics
    // @access  Private
    static async getCourseTopics(req, res) {
        try {
            TopicService.getCourseTopics(req.courseId).then((data) => {
                if (data.length == 0) {
                    return res.status(200).json({
                        error: false,
                        msg: 'Bạn chưa có topic nào',
                    });
                }
                res.status(200).json({
                    error: false,
                    topics: data,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
    // @route   GET api/course/:courseId/topic/edit/:topicId
    // @desc    edit Topics
    // @access  Private
    static async editTopic(req, res) {
        let topic = {
            id: req.params.topicId,
            title: req.body.title,
            content: req.body.content,
        };
        try {
            TopicService.editTopic(topic).then((updated) => {
                if (!updated) {
                    return res.status(400).json({
                        error: true,
                        msg: 'Bạn chưa cập nhật được topic',
                    });
                }
                res.status(200).json({
                    error: false,
                    msg: 'cập nhật topic thành công',
                    topic,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
    // @route   GET api/course/:courseId/topic/changeOrder/:topicId
    // @desc    edit Topic
    // @access  Private
    static async changeOrder(req, res) {
        let topic = {
            id: req.params.topicId,
            indexOrder: req.body.indexOrder,
        };
        try {
            TopicService.editTopic(topic).then((updated) => {
                if (!updated) {
                    return res.status(400).json({
                        error: true,
                        msg: 'Bạn chưa cập nhật được thứ tự topic',
                    });
                }
                res.status(200).json({
                    error: true,
                    msg: 'cập nhật thứ tụ topic thành công',
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
    // @route   GET api/topic/:courseId/deleteTopic/:topicId
    // @desc    Delete Topic
    // @access  Private
    static async deleteTopic(req, res) {
        try {
            TopicService.deleteTopic(req.params.topicId).then((deleted) => {
                if (!deleted) {
                    return res.status(400).json({
                        error: true,
                        msg: 'Bạn chưa xoá được topic',
                    });
                }
                res.status(200).json({
                    error: true,
                    msg: 'Bạn đã xoá topic',
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
