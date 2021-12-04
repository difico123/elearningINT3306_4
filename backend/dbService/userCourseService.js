const { sequelize } = require('../db/models');
const { QueryTypes } = require('sequelize');

module.exports = class UserCourseService {
    static async getUsersbyCourseId(id) {
        try {
            const response = await sequelize.query(
                `select uc.userId, concat(u.firstName," ",u.lastName) as studentName , uc.rating, uc.marks,
                u.email, u.phoneNumber from usercourses uc 
                join users u on u.id = uc.userId 
                where uc.courseId = ?`,
                {
                    replacements: [id],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async getUserCourses(userId) {
        try {
            const response = await sequelize.query(
                `SELECT c.id as courseId, c.name, uc.isComplete, uc.marks, c.instructorId, c.imageUrl,
                concat(u.firstName," ", u.lastName) as fullName, u.email , 
                DATE_FORMAT(uc.dateAdded, "ngày %d tháng %m năm %Y") as enrollDate 
                FROM usercourses uc join courses c on c.id = uc.courseId 
                join users u on c.instructorId = u.id
                 WHERE uc.userId = ${userId};`,
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
};
