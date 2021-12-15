const { sequelize } = require('../db/models');
const { QueryTypes } = require('sequelize');

module.exports = class CategoryService {
    static async getCategories() {
        try {
            const response = await sequelize.query(
                `select ca.id as categoryId,ca.name as categoryName,ca.imageUrl,count(c.id) as courseNum, 
                sum(ue.userNum) as register,
                round(avg(ue.star),1) as rating from categories ca 
                left join courses c on c.categoryId = ca.id and c.verified = 1
                left join (select co.id, count(uc.id)as userNum,
                round(avg(uc.rating),1) as star from courses co 
                join usercourses uc on co.id = uc.courseId 
                group by co.id) as ue
                on ue.id = c.id
                group by ca.id;`,
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
    static async getCategoriesName() {
        try {
            const response = await sequelize.query(
                `select id, name from categories;`,
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
