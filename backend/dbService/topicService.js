const { sequelize } = require('../db/models');
const { QueryTypes } = require('sequelize');

module.exports = class TopicService {
    static async getShortTopic(courseId) {
        try {
            const response = await sequelize.query(
                `SELECT t.id, t.title, t.description
                FROM topics t
                where t.courseId = ?`,
                {
                    replacements: [courseId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async getTopicName(courseId) {
        try {
            const response = await sequelize.query(
                `SELECT t.id, t.title
                FROM topics t
                where t.courseId = ?`,
                {
                    replacements: [courseId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async getTopicNames(courseId) {
        try {
            const response = await sequelize.query(
                `SELECT t.id, t.title
                FROM topics t
                where t.courseId = ?`,
                {
                    replacements: [courseId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
};
