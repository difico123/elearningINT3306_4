const { sequelize } = require('../db/models');
const { QueryTypes } = require('sequelize');

module.exports = class UserService {
    static async getUserbyEmail(keyword, courseId) {
        try {
            const response = await sequelize.query(
                `SELECT id, email, concat(firstName,' ', lastName) as fullName FROM users WHERE email like '%${keyword}%' and users.role != 2
                and users.role != 1 and users.id not in (select userId from usercourses where usercourses.courseId = ${courseId})
                limit 5;`,
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
