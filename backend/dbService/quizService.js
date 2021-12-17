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
};
