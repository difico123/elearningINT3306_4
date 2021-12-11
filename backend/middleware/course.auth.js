const { User, Course, Category, UserCourse, Topic } = require('../db/models');
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
            }

            next();
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error');
        }
    },

    questionQuizAuth: function (req, res, next) {
        let questionId =
            req.params.questionId === undefined
                ? req.questionId
                : req.params.questionId;
        let quizId =
            req.params.quizId === undefined ? req.quizId : req.params.quizId;
        try {
            QuestionService.checkQuestionQuiz(questionId, quizId).then(
                (data) => {
                    if (data.length === 0) {
                        return res.status(403).json({
                            error: true,
                            msg: 'Question không nằm trong quiz',
                        });
                    }

                    next();
                },
            );
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error');
        }
    },
};
