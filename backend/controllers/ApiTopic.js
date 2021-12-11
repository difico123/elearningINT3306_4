const { User, Course, Category, UserCourse, Topic } = require('../db/models');

module.exports = class ApiTopic {
    // @route   POST api/topic/create
    // @desc    Create topic
    // @access  Private
    static async createTopic(req, res) {
        const topic = {
            courseId: req.courseId,
            title: req.body.title,
            content: req.body.content,
            description: req.body.description,
        };
        try {
            await Topic.create(topic).then((topic) => {
                res.status(201).json({
                    error: false,
                    msg: 'Tạo chủ đề thành công',
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
            let course = await Course.findOne({ where: { id: req.courseId } });
            let topics = await Topic.findAll({
                where: { courseId: req.courseId },
            });

            res.status(200).json({
                error: false,
                course,
                topics: topics,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/topic/getSingleTopic/:topicId
    // @desc    getSingleTopic
    // @access  Private
    static async getSingleTopics(req, res) {
        try {
            let topic = await Topic.findOne({
                where: { id: req.params.topicId },
            });

            res.status(200).json({
                error: false,
                topic: topic,
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
