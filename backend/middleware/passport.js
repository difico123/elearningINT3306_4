const { User, Category, Course } = require('../db/models');

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

    topicPassport: function (req, res, next) {
        let topicId = req.params.topicId;
        TopicService.getCourseTopicById(topicId).then((topics) => {
            if (topics.length === 0) {
                return res.status(404).json({
                    error: true,
                    msg: 'Không có Topic',
                });
            } else {
                req.topicId = topicId;
                next();
            }
        });
    },

    quizPassport: function (req, res, next) {
        let quizId = req.params.quizId;
        QuizService.getQuizById(quizId).then((quizes) => {
            if (quizes.length === 0) {
                return res.status(404).json({
                    error: true,
                    msg: 'Không có Quiz',
                });
            } else {
                req.quizId = quizId;
                next();
            }
        });
    },

    questionPassport: function (req, res, next) {
        let questionId = req.params.questionId;
        QuestionService.getQuestionByQuestionId(questionId).then(
            (questions) => {
                if (questions.length === 0) {
                    return res.status(404).json({
                        error: true,
                        msg: 'Không có câu hỏi',
                    });
                } else {
                    req.questionId = questionId;

                    next();
                }
            },
        );
    },
};
