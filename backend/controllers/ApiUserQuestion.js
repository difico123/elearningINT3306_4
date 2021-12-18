const { Question, UserQuestion,Choice } = require('../db/models');
const QuizService = require('../dbService/quizService');
module.exports = class ApiUserQuestion {
    // @route   POST /api/userquestion/answer/:questionId
    // @desc    answer a question by student
    // @access  Private
    static async answerQuestion(req, res) {
        const {role, id} = req.user
        const answer = {
            userId: id,
            choiceId: parseInt(req.params.choiceId),
            questionId: parseInt(req.questionId),
        };
        try {
            if(role === 1) {
                return res.status(403).json({
                    error: true,
                    msg: 'Bạn không thể trả lời câu hỏi này',
                });
            } 
            if(!answer.choiceId) {
                return res.status(403).json({
                    error: true,
                    msg: 'Bạn phải chọn một đáp án!',
                });
            }
            let check = await UserQuestion.findOne({ where: {userId: id, questionId: answer.questionId}})
            if(check) {
                return res.status(403).json({
                    error: true,
                    msg: 'Bạn đã trả lời khoá học',
                });
            }

           let isCorrect =  await Choice.findOne({where: { id: answer.choiceId, isAnswer: 1 }, attributes: ['id']})

            await UserQuestion.create(answer).then((value) => {
                return res.status(200).json({
                    error: false,
                    msg: 'Trả lời câu hỏi thành công!',
                    value,
                    isCorrect: isCorrect? true: false,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/question/:courseId/:quizId/getQuestions
    // @desc    get question with quizId by instructor and student
    // @access  Private
    static async getQuestions(req, res) {
        try {
            QuestionService.getQuestionByQuizId(req.quizId).then((data) => {
                if (data.length == 0) {
                    return res.status(200).json({
                        error: false,
                        msg: 'Bạn chưa có câu hỏi nào',
                    });
                }
                res.status(200).json({
                    error: false,
                    data,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/userquestion/:courseId/:quizId/getQuizScore
    // @desc    rank student by quizid
    // @access  Private
    static async getQuizScore(req, res) {
        try {
            QuizService.getQuizById(req.quizId).then((quizes) => {
                let quiz = quizes[0];
                quiz.rank = [];
                QuestionService.rank(req.quizId).then((data) => {
                    quiz.rank = [...data];
                    res.status(200).json({
                        error: false,
                        quiz,
                    });
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET /api/course/:courseId/topic/question/:questionId
    // @desc    history user question
    // @access  Private
    static async history(req, res) {
        let {id} = req.user;
        try {
            let history = await UserQuestion.findOne({where: {userId: id, questionId: req.params.questionId}, attributes: ['choiceId']});
            let correctAnswer 
            if(history) {
                correctAnswer = (await QuizService.showCorrectAnswer(req.params.questionId))[0].choiceId
            }   
            res.status(200).json({
                error: false,
                history,
                correctAnswer
            }); 
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
