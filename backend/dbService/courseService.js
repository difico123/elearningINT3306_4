const { sequelize } = require('../db/models');
const { QueryTypes } = require('sequelize');

module.exports = class CourseService {
    static async getAll({ keyword, rating, categoryId }) {
        let nameQuery =
            keyword !== undefined ? `and c.name like "%${keyword}%"` : '';
        let ratingQuery = rating !== undefined ? ` rating >= ${rating} ` : '';
        let categoryQuery =
            categoryId !== undefined ? ` categoryId = ${categoryId}` : '';

        let and =
            rating !== undefined && categoryId !== undefined ? ` and ` : ' ';
        let having =
            rating !== undefined || categoryId !== undefined ? `having ` : ' ';
        let query = `select c.id as courseId, c.name, c.description, c.categoryId, ca.name as categoryName,
        c.instructorId, concat(u.firstName," ", u.lastName) as instructorName,
        u.email as instructorEmail, round(avg(uc.rating),1) as rating,
        c.imageUrl,
        count(uc.id) as register
        from courses c
        JOIN categories ca on ca.id = c.categoryId 
        left join usercourses uc on uc.courseId = c.id 
        left join users u on u.id = c.instructorId
        where c.verified = 1 
        ${nameQuery} group by c.id
        ${having} ${ratingQuery} ${and} ${categoryQuery}`;

        try {
            const response = await sequelize.query(query, {
                replacements: [],
                type: QueryTypes.SELECT,
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async getInstructorCourses(userId,keyword ='') {
        let nameQuery = keyword !== undefined ? `and c.name like "%${keyword}%"` : '';
        try {
            const response = await sequelize.query(
                `select c.id,c.categoryId,c.name,c.description,ca.name as categoryName,c.imageUrl,c.verified,DATE_FORMAT(c.dateAdded, "%h:%i:%s' %d/%m/%Y") as dateAdded from courses c
                join categories ca on c.categoryId = ca.id where c.instructorId = ? ${nameQuery} order by c.id desc;`,
                {
                    replacements: [userId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async getSingleCourse(courseId) {
        try {
            const response = await sequelize.query(
                `select c.id, c.name, c.description,c.instructorId, 
                concat(u.firstName,' ', u.lastName) as instructorName, 
                c.imageUrl, COUNT(uc.id) as register,
                round(avg(uc.rating),1) as rating,
                top.num_topic as numTopic
                from courses c
               	left join usercourses uc on uc.courseId = c.id 
                left join (select t.courseId, count(t.id) 
                as num_topic from topics t group by t.courseId) 
                as top on top.courseId = c.id
                join users u on u.id = c.instructorId 
                where c.id = ?
                group by c.id;`,
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
