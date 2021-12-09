const { sequelize } = require('../db/models');
const { QueryTypes } = require('sequelize');

module.exports = class AdminService {
    static async getUsers() {
        try {
            const response = await sequelize.query(
                `select u.id,concat(u.firstName,' ',u.lastName) as fullName, u.email, 
                u.phoneNumber, u.address,
                u.role,u.imageUrl 
                from users u 
                where u.role != 2;`,
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
    static async getCourses() {
        try {
            const response = await sequelize.query(
                `select c.id, c.name, c.instructorId, 
                concat(u.firstName,' ', u.lastName) as instructorName, c.imageUrl as courseImg, u.imageUrl as avt
                from courses c 
                join users u on u.id = c.instructorId;`,
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
