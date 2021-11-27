const { sequelize } = require("../db/models");
const { QueryTypes } = require("sequelize");

module.exports = class CourseService {
  static async getAll({ keyword, rating, categoryId }) {
    let nameQuery =
      keyword !== undefined ? `and c.name like "%${keyword}%"` : "";
    let ratingQuery = rating !== undefined ? ` rating >= ${rating} ` : "";
    let categoryQuery =
      categoryId !== undefined ? ` categoryId like "%${categoryId}%"` : "";
    let and = rating !== undefined && categoryId !== undefined ? ` and ` : " ";
    let having =
      rating !== undefined || categoryId !== undefined ? `having ` : " ";
    let query = `select c.id as courseId, c.name, c.description, c.categoryId, ca.name as categoryName,
        c.imageUrl,
        c.instructorId, concat(u.firstName," ", u.lastName) as instructorName,
        u.email as instructorEmail, round(avg(uc.rating),1) as rating,
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
};
