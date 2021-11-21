const { sequelize } = require('../db/models');
const { QueryTypes } = require('sequelize');

module.exports = class CourseService {
    static async getAll({ keyword, rating, categoryName }) {
        let nameQuery =  keyword !== undefined  ? `and c.name like "%${keyword}%"` : '';
        let ratingQuery = rating !== undefined  ? ` rating >= ${rating} ` : '';
        let categoryQuery = categoryName !== undefined  ? ` categoryName like "%${categoryName}%"` : '';
        let and = (rating !== undefined && categoryName !== undefined)? ` and ` : ' ';
        let having = (rating !== undefined || categoryName !== undefined)? `having ` : ' ';
        let query = 
        `select c.id as courseId, c.name, c.description, c.categoryId, ca.name as categoryName,
        c.instructorId, concat(u.firstName," ", u.lastName) as instructorName,
        u.email as instructorEmail, round(avg(uc.rating),1) as rating,
        count(uc.id) as register
        from courses c
        JOIN categories ca on ca.id = c.categoryId 
        left join usercourses uc on uc.courseId = c.id 
        left join users u on u.id = c.instructorId
        where c.verified = 1 
        ${nameQuery} group by c.id
        ${having} ${ratingQuery} ${and} ${categoryQuery}`
        
        try {
            const response = await sequelize.query(
                query,
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
