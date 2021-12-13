const { Quiz } = require('../db/models');
const  QuizService = require('../dbService/quizService')

module.exports = class ApiQuizes {
    // @route   POST api/quizes/:courseId/:topicId/create
    // @desc    create quizes by instructor
    // @access  Private
    static async createQuiz(req, res) {
        const quiz = {
            topicId: req.topicId,
            title: req.body.title,
        };
        try {
            let newQuiz = await Quiz.create(quiz)
            return res.status(200).json({
                error: false,
                msg: 'tạo quiz thành công',
                newQuiz
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
    
    // @route   POST api/course/:courseId/topic/:topicId/quiz/active/:quizId
    // @desc    active quiz by instructor
    // @access  Private
    static async showQuiz(req, res) {
        try {
            Quiz.update({shown: 1}, {where: {id: req.params.quizId}}).then((quiz) => {
                return res.status(200).json({
                    error: false,
                    msg: 'Đã activate quiz',
                });
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   POST api/course/:courseId/topic/:topicId/quiz/hide/:quizId
    // @desc    hide quiz by instructor
    // @access  Private
    static async hideQuiz(req, res) {
        try {
            Quiz.update({shown: 0}, {where: {id: req.params.quizId}}).then((quiz) => {
                return res.status(200).json({
                    error: false,
                    msg: 'Đã suspend quiz',
                });
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/quizes/:courseId/:topicId/getQuizes
    // @desc    get quizzes by instructor and student
    // @access  Private
    static async getquizes(req, res) {
        try {
            QuizService.getQuizNames(req.topicId).then((data) => {
                res.status(200).json({
                    error: false,
                    quizes: data,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/quizes/:courseId/:topicId/getQuizeNames
    // @desc    get quizzes by instructor and student
    // @access  Private
    static async getQuizNames(req, res) {
        try {
            let quizes =  await QuizService.getQuizNames(req.topicId);

            for (let i = 0; i < quizes.length; i++) {
                await QuizService.getQuestionNumber(quizes[i].id).then(total => {
                    quizes[i].total = total[0].total;
                })
            }
            res.status(200).json({
                error: false,
                quizes: quizes,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/topic/edit/:topicId
    // @desc    edit Topics
    // @access  Private
    // static async editTopic(req, res) {
    //     let topic = {
    //         id: req.params.topicId,
    //         indexOrder: req.body.indexOrder,
    //         title: req.body.title,
    //         content: req.body.content,
    //     };
    //     try {
    //         TopicService.editTopic(topic).then((updated) => {
    //             if (!updated) {
    //                 return res.status(400).json({
    //                     error: true,
    //                     msg: 'Bạn chưa cập nhật được topic',
    //                 });
    //             }
    //             res.status(200).json({
    //                 error: true,
    //                 msg: 'cập nhật topic thành công',
    //             });
    //         });
    //     } catch (error) {
    //         console.log(error.message);
    //         res.status(500).send('Server error');
    //     }
    // }
};
