const { sequelize } = require('../db/models');
const { QueryTypes } = require('sequelize');

module.exports = class QuizService {
    static async getQuestionById(questionId) {
        try {
            const response = await sequelize.query(
                `select q.id as questionId, q.content, q.quizId, q.marks from questions q where q.id = ?`,
                {
                    replacements: [questionId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async getQuizNames(topicId) {
        try {
            const response = await sequelize.query(
                `select q.id, q.title, q.shown from quizzes q where q.topicId = ?`,
                {
                    replacements: [topicId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async getShownQuizNames(topicId) {
        try {
            const response = await sequelize.query(
                `select q.id, q.title, q.shown, count(qu.id) as total from quizzes q 
                join questions qu on q.id = qu.quizId
                where q.topicId = 1 and q.shown = 1;`,
                {
                    replacements: [topicId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async getQuizTitles(topicId) {
        try {
            const response = await sequelize.query(
                `select q.id, q.title from quizzes q where q.topicId = ?`,
                {
                    replacements: [topicId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async getQuestionNumber(quizId) {
        try {
            const response = await sequelize.query(
                `select count(q.id) as total from questions q where q.quizId = ?`,
                {
                    replacements: [quizId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async getAnswerByQuestionId(questionId) {
        try {
            const response = await sequelize.query(
                `select c.id as answerId,c.content from choices c where c.questionId = ?;`,
                {
                    replacements: [questionId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async getQuestionsByQuizId(quizId) {
        try {
            const response = await sequelize.query(
                `select qu.quizId, q.shown,  qu.id as questionId,
                    qu.content, qu.marks from quizzes q 
                    join questions qu on q.id = qu.quizId 
                    where q.id = ?`,
                {
                    replacements: [quizId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async getInstructorAnswersByQuestionId(questionId) {
        try {
            const response = await sequelize.query(
                `select c.id as choiceId, c.content, c.isAnswer from questions q 
                join choices c on c.questionId = q.id WHERE q.id = ?`,
                {
                    replacements: [questionId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async getStudentAnswersByQuestionId(questionId) {
        try {
            const response = await sequelize.query(
                `select c.id as choiceId, c.content from questions q 
                join choices c on c.questionId = q.id WHERE q.id = ?`,
                {
                    replacements: [questionId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async checkCorrectAnswer(UserId ,questionId, ChoiceId ) {
        try {
            const response = await sequelize.query(
                `select ch.id from userquestions qu 
                join choices ch on ch.id = qu.choiceId
                where qu.userId = ${UserId} and qu.choiceId = ${ChoiceId} and qu.questionId = ${questionId} and ch.isAnswer = 1;`,
                {
                    replacements: [],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async rank(courseId ) {
        try {
            const response = await sequelize.query(
                `select concat(us.firstName," ",us.lastName) as fullName, uq.userId, sum(qu.marks) 
                as marks from userquestions uq 
                join choices ch on ch.id = uq.choiceId
                join questions qu on qu.id = uq.questionId
                join quizzes qi on qu.quizId = qi.id
                join topics ts on ts.id = qi.topicId
                join courses cs on cs.id = ts.courseId
                join users us on us.id = uq.userId
                where ch.isAnswer = 1 and cs.id = ${courseId}
                group by uq.userId ORDER by marks desc, uq.id desc limit 10;`,
                {
                    replacements: [],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async showCorrectAnswer(questionId ) {
        try {
            const response = await sequelize.query(
                `select ch.id as choiceId from questions qu 
                join choices ch on ch.questionId = qu.id
                where ch.isAnswer = 1 and qu.id = ${questionId};`,
                {
                    replacements: [],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async isAvailableQuestion(quizId ,userId) {
        try {
            const quiz = await sequelize.query(
                `select count(qu.id) as total from quizzes qi 
                join questions qu on qu.quizId = qi.id
                where qi.id = ${quizId} and qi.shown = 1`,
                {
                    replacements: [],
                    type: QueryTypes.SELECT,
                },
            );
            const question = await sequelize.query(
                `select count(uq.id) as total from userquestions uq 
                join questions qu on qu.id = uq.questionId
                join quizzes qi on qi.id = qu.quizId
                where qi.shown = 1 and uq.userId = ${userId} and qi.id = ${quizId}`,
                {
                    replacements: [],
                    type: QueryTypes.SELECT,
                },
            );

            return question[0].total === quiz[0].total
        } catch (error) {
            console.log(error);
        }
    }
};
