const { Quiz, Question,UserQuestion } = require('../db/models');
const QuizService = require('../dbService/quizService');
const { pagination } = require('../utils/feature');

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
            let newQuiz = await Quiz.create(quiz);
            return res.status(200).json({
                error: false,
                msg: 'tạo quiz thành công',
                newQuiz,
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
            Quiz.update(
                { shown: 1 },
                { where: { id: req.params.quizId } },
            ).then((quiz) => {
                return res.status(200).json({
                    error: false,
                    msg: 'Đã activate quiz',
                });
            });
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
            Quiz.update(
                { shown: 0 },
                { where: { id: req.params.quizId } },
            ).then((quiz) => {
                return res.status(200).json({
                    error: false,
                    msg: 'Đã suspend quiz',
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   POST api/course/:courseId/topic/:topicId/quiz/edit/:quizId
    // @desc    hide quiz by instructor
    // @access  Private
    static async editQuiz(req, res) {
        try {
            Quiz.update(
                { title: req.body.title },
                { where: { id: req.params.quizId } },
            ).then((quiz) => {
                return res.status(200).json({
                    error: false,
                    msg: 'Đã sửa quiz!',
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   POST api/course/:courseId/topic/:topicId/quiz/edit/:quizId
    // @desc    hide quiz by instructor
    // @access  Private
    static async deleteQuiz(req, res) {
        try {
            Quiz.destroy({ where: { id: req.params.quizId } }).then((quiz) => {
                return res.status(200).json({
                    error: false,
                    msg: 'Đã xoá quiz!',
                });
            });
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
        let { page } = req.query;
        try {
            let quizes = await QuizService.getQuizNames(req.topicId);

            for (let i = 0; i < quizes.length; i++) {
                await QuizService.getQuestionNumber(quizes[i].id).then(
                    (total) => {
                        quizes[i].total = total[0].total;
                    },
                );
            }
            quizes = pagination(quizes, page, 7);
            res.status(200).json({
                error: false,
                quizes: quizes,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/quizes/:courseId/:topicId/getQuizTitles
    // @desc    get quizzes by instructor and student
    // @access  Private
    static async getQuizTitles(req, res) {
        try {
            let quizes = await QuizService.getQuizNames(req.topicId);

            res.status(200).json({
                error: false,
                quizes: quizes,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/course/:courseId/topic/:topicId/quiz/getQuestionIds/:quizId
    // @desc    getQuestionIds
    // @access  Private
    static async getQuizQuestionIds(req, res) {
        try {
            let quizQuestionIds = {};
            await Quiz.findOne({
                where: { id: req.params.quizId },
                attributes: ['id', 'title'],
            }).then((quiz) => {
                quizQuestionIds = quiz;
            });

            await Question.findAll({
                where: {
                    quizId: req.params.quizId,
                },
                attributes: ['id'],
            })
                .then(async (questionIds) => {
                    for(let i = 0; i < questionIds.length; i++) {

                        let ques = await UserQuestion.findOne({
                            where: { questionId: questionIds[i].id,userId : req.user.id },
                            attributes: ['id'],
                        })
                        
                        let avai = false
                        if(ques) {
                            avai = true
                        }
                        questionIds[i]= {id: questionIds[i].id, avail: !avai}
                    }

                    return res.status(200).json({
                        error: false,
                        quiz: quizQuestionIds,
                        questionIds: questionIds,
                    });
                })
                .catch((err) => {
                    return res.status(400).json({
                        error: err,
                    });
                });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   POST api/course/:courseId/topic/:topicId/quiz/getQuestions/:quizId
    // @desc    getQuestions by instructor
    // @access  Private
    static async getInstructorAnswersByQuestionId(req, res) {
        try {
            let questions = await QuizService.getQuestionsByQuizId(req.params.quizId);
            for (let i = 0; i < questions.length; i++) {
                let answers =
                    await QuizService.getInstructorAnswersByQuestionId(
                        questions[i].questionId,
                    );
                questions[i].answers = [...answers];
            }
            res.status(200).json({
                error: false,
                questions: questions,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   POST api/course/:courseId/topic/:topicId/quiz/getQuestionsForStudent/:quizId
    // @desc    getQuestions by student
    // @access  Private
    static async getStudentAnswersByQuestionId(req, res) {
        try {
            let questions = await QuizService.getQuestionsByQuizId(req.topicId);
            for (let i = 0; i < questions.length; i++) {
                let answers = await QuizService.getStudentAnswersByQuestionId(
                    questions[i].questionId,
                );
                questions[i].answers = [...answers];
            }
            res.status(200).json({
                error: false,
                questions: questions,
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
