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
};
