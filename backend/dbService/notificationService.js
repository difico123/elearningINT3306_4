const { sequelize } = require('../db/models');
const { QueryTypes } = require('sequelize');

module.exports = class NotificationService {
    static async getInstructorNotification(instructorId) {
        try {
            const response = await sequelize.query(
                `select n.id, n.courseId,n.userId, n.type, n.details, c.name,
                n.viewed, n.isConfirmed,
                DATE_FORMAT(n.createdAt, "%h:%i:%s' %d/%m/%Y") as sendAt from notifications n
                join courses c on c.id = n.courseId
                where c.instructorId = ? and n.type = 0  order by n.id desc`,
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
    static async getStudentNotification(instructorId) {
        try {
            const response = await sequelize.query(
                `select n.id, n.courseId,n.userId, n.type, n.details, c.name,
                n.viewed, n.isConfirmed,
                DATE_FORMAT(n.createdAt, "%h:%i:%s' %d/%m/%Y") as sendAt from notifications n
                join courses c on c.id = n.courseId
                where n.userId = ? and type = 1 order by n.createdAt desc;`,
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
    static async getInstructorWatch(instructorId) {
        try {
            const response = await sequelize.query(
                `select count(n.id) as NotSeen from notifications n
                join courses c on c.id = n.courseId
                where c.instructorId = ? and n.type = 0 and n.viewed = 0;`,
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
    static async getStudentWatch(studentId) {
        try {
            const response = await sequelize.query(
                `select count(n.id) as NotSeen from notifications n
                join courses c on c.id = n.courseId
                where n.userId = ? and n.type = 1 and n.viewed = 0;`,
                {
                    replacements: [studentId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
};
