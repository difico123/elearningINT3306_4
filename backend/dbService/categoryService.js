const { sequelize } = require("../db/models");
const { QueryTypes } = require("sequelize");

module.exports = class CategoryService {
  static async getCategories() {
    try {
      const response = await sequelize.query(
        `select ca.id as categoryId, ca.name as categoryName, ca.imageUrl,
                count(c.id) as courseNum,count(uc.id) as register,
                round(avg(uc.rating),1) as rating
                from courses c right join categories ca on ca.id = c.categoryId 
                left join usercourses uc on uc.courseId = c.id group by ca.id;`,
        {
          replacements: [],
          type: QueryTypes.SELECT,
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  static async getCategoriesName() {
    try {
      const response = await sequelize.query(
        `select id, name from categories;`,
        {
          replacements: [],
          type: QueryTypes.SELECT,
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
