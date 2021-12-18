const { Question } = require('../db/models');
const QuizService = require('../dbService/quizService');
module.exports = class ApiQuestion {
    // @route   POST api/course/:courseId/topic/:topicId/quiz/:quizId/question/create
    // @desc    create question by instructor
    // @access  Private
    static async createQuestion(req, res) {
        const question = {
            content: req.body.content,
            quizId: req.quizId,
            marks: req.body.marks,
        };
        try {
            let newQuestion = await Question.create(question);
            return res.status(200).json({
                error: false,
                msg: 'tạo câu hỏi thành công',
                newQuestion,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   POST api/course/:courseId/topic/:topicId/quiz/:quizId/edit/:questionId
    // @desc    create question by instructor
    // @access  Private
    static async editQuestion(req, res) {
        const question = {
            content: req.body.content,
            quizId: req.quizId,
            marks: req.body.marks,
        };
        try {
            await Question.update(
                { ...question },
                { where: { id: req.params.questionId } },
            )
                .then(() => {
                    return res.status(200).json({
                        error: false,
                        msg: 'Sửa câu hỏi thành công',
                    });
                })
                .catch((err) => {
                    return res.status(400).json({
                        error: true,
                        msg: 'lỗi',
                        err,
                    });
                });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   POST api/course/:courseId/topic/:topicId/quiz/:quizId/question/delete/:questionId
    // @desc    create question by instructor
    // @access  Private
    static async deleteQuestion(req, res) {
        try {
            await Question.destroy({ where: { id: req.params.questionId } })
                .then(() => {
                    return res.status(200).json({
                        error: false,
                        msg: 'Xoá câu hỏi thành công',
                    });
                })
                .catch((err) => {
                    return res.status(400).json({
                        error: true,
                        msg: 'lỗi',
                        err,
                    });
                });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/course/:courseId/topic/:topicId/quiz/:quizId/question/getQuestions
    // @desc    get question with quizId by instructor and student
    // @access  Private
    static async getQuestions(req, res) {
        try {
            QuestionService.getQuestionByQuizId(req.quizId).then((data) => {
                if (data.length == 0) {
                    return res.status(400).json({
                        error: false,
                        msg: 'Không có câu hỏi',
                    });
                }
                res.status(200).json({
                    error: false,
                    questions: data,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/course/:courseId/topic/:topicId/quiz/:quizId/question/getQuestionAnswers/:questionId
    // @desc    getQuestionAswers by instructor and student
    // @access  Private
    static async getQuestionAnswers(req, res) {
        try {
            let content = '';
            let marks = ''
            await Question.findOne({
                where: {
                    id: req.params.questionId,
                },
                attributes: ['content',"marks"],
            }).then((v) => {
                content = v.content
                marks = v.marks
            });
            await QuizService.getStudentAnswersByQuestionId(
                req.params.questionId,
            ).then((v) => {
                return res.status(200).json({
                    error: false,
                    content: content,
                    marks: marks,
                    question: v,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
