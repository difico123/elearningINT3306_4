const {
    User,
    Category,
    Course,
    Topic,
    Quiz,
    Question,
} = require('../db/models');

module.exports = {
    categoryPassport: async (req, res, next) => {
        let categoryId = req.params.categoryId;

        let category = await Category.findOne({ where: { id: categoryId } });
        if (!category) {
            return res.status(404).json({
                error: true,
                msg: 'Không có loại khoá học',
            });
        } else {
            req.categoryId = categoryId;
            next();
        }
    },

    coursePassport: async (req, res, next) => {
        let courseId = req.params.courseId;

        let course = await Course.findOne({ where: { id: courseId } });

        if (!course) {
            return res.status(404).json({
                error: true,
                msg: 'Không có khoá học',
            });
        } else {
            req.courseId = courseId;
            next();
        }
    },

    topicPassport: async (req, res, next) => {
        let topicId = req.params.topicId;

        let topic = await Topic.findOne({ where: { id: topicId } });

        if (!topic) {
            return res.status(404).json({
                error: true,
                msg: 'Không có topic',
            });
        } else {
            req.topicId = topicId;
            next();
        }
    },

    quizPassport: async (req, res, next) => {
        let quizId = req.params.quizId;
        let quiz = await Quiz.findOne({ where: { id: quizId } });
        if (!quiz) {
            return res.status(404).json({
                error: true,
                msg: 'Không có quiz',
            });
        } else {
            req.quizId = quizId;
            next();
        }
    },

    questionPassport: async (req, res, next) => {
        let questionId = req.params.questionId;
        let question = await Question.findOne({ where: { id: questionId } });
        if (!question) {
            return res.status(404).json({
                error: true,
                msg: 'Không có câu hỏi',
            });
        } else {
            req.questionId = questionId;
            next();
        }
    },

    choicePassport: async (req, res, next) => {
        let choiceId = req.params.choiceId;
        let choice = await Choice.findOne({ where: { id: choiceId } });
        if (!choice) {
            return res.status(404).json({
                error: true,
                msg: 'Không có câu hỏi',
            });
        } else {
            req.choiceId = choiceId;
            next();
        }
    },
};
