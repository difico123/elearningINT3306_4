const { sequelize } = require('../db/models');
const { QueryTypes } = require('sequelize');

module.exports = class NotificationService {
    static async getNotification(instructorId) {
        try {
            const response = await sequelize.query(
                `select n.id, n.courseId,n.senderId, n.topic,n.details,c.name,
                n.viewed, n.isConfirmed,
                DATE_FORMAT(n.createdAt, "%h:%i:%s' %d/%m/%Y") as sendAt from notifications n
                join courses c on c.id = n.courseId
                where c.instructorId = ? order by n.createdAt desc`,
                {
                    replacements: [instructorId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async getWatch(instructorId) {
        try {
            const response = await sequelize.query(
                `select count(n.id) as NotSeen from notifications n
                join courses c on c.id = n.courseId
                where c.instructorId = ? and n.viewed = 0;`,
                {
                    replacements: [instructorId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
};
