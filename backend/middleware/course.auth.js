const {
    User,
    Course,
    Category,
    UserCourse,
    Topic,
    Quiz,
    Choice,
    Question,
} = require('../db/models');
module.exports = {
    topicCourseAuth: async function (req, res, next) {
        let courseId =
            req.params.courseId === undefined
                ? req.courseId
                : req.params.courseId;
        let topicId =
            req.params.topicId === undefined ? req.topicId : req.params.topicId;
        try {
            let check = await Topic.findOne({
                where: { id: topicId, courseId: courseId },
            });
            if (!check) {
                return res.status(403).json({
                    error: true,
                    msg: 'Topic không nằm trong khoá học',
                });
            } else {
                next();
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error');
        }
    },

    quizTopicAuth: async function (req, res, next) {
        let quizId =
            req.params.quizId === undefined ? req.quizId : req.params.quizId;
        let topicId =
            req.params.topicId === undefined ? req.topicId : req.params.topicId;

        try {
            let check = await Quiz.findOne({
                where: { id: quizId, topicId: topicId },
            });
            if (!check) {
                return res.status(403).json({
                    error: true,
                    msg: 'Quiz không nằm trong topic',
                });
            } else {
                next();
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error');
        }
    },

    questionQuizAuth: async (req, res, next) => {
        let questionId =
            req.params.questionId === undefined
                ? req.questionId
                : req.params.questionId;
        let quizId =
            req.params.quizId === undefined ? req.quizId : req.params.quizId;
        try {
            let check = await Question.findOne({
                where: { id: questionId, quizId },
            });
            if (!check) {
                return res.status(403).json({
                    error: true,
                    msg: 'Câu hỏi không nằm trong quiz',
                });
            } else {
                next();
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error');
        }
    },
    choiceQuestionAuth: async (req, res, next) => {
        let questionId =
            req.params.questionId === undefined
                ? req.questionId
                : req.params.questionId;
        let choiceId =
            req.params.choiceId === undefined
                ? req.choiceId
                : req.params.choiceId;
        try {
            let check = await Choice.findOne({
                where: { id: choiceId, questionId },
            });
            if (!check) {
                return res.status(403).json({
                    error: true,
                    msg: 'Câu trả lời không nằm trong câu hỏi',
                });
            } else {
                next();
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error');
        }
    },
};
