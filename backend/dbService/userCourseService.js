const { sequelize } = require('../db/models');
const { QueryTypes } = require('sequelize');

module.exports = class UserCourseService {
    static async getUsersbyCourseId(courseId) {
        try {
            const response = await sequelize.query(
                `select uc.userId,concat(u.firstName, " ", u.lastName) as studentName, u.imageUrl, u.email, u.phoneNumber,u.address, m.marks  from usercourses uc 
                left join (select uq.userId, sum(qu.marks) 
                as marks from userquestions uq 
                join choices ch on ch.id = uq.choiceId
                join questions qu on qu.id = uq.questionId
                join quizzes qi on qu.quizId = qi.id
                join topics ts on ts.id = qi.topicId
                join courses cs on cs.id = ts.courseId
                where ch.isAnswer = 1 and cs.id = ${courseId}
                group by uq.userId) as m on uc.userId = m.userId 
                join users u on u.id = uc.userId
                where uc.courseId = ${courseId};`,
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
    static async getUserCourses(userId, keyword) {
        let queryStr = keyword? `and c.name like '%${keyword}%'`: ""
        try {
            const response = await sequelize.query(
                `SELECT c.id as courseId, c.name, c.instructorId , c.imageUrl,
                u.phoneNumber,
                concat(u.firstName," ", u.lastName) as fullName, u.email , 
                DATE_FORMAT(uc.dateAdded, "ngày %d tháng %m năm %Y") as enrollDate 
                FROM usercourses uc join courses c on c.id = uc.courseId 
                join users u on c.instructorId = u.id
                 WHERE uc.userId = ${userId} ${queryStr}`,
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
    static async checkOtherInstructor(userId, courseId) {
        try {
            const response = await sequelize.query(
                `select c.id from courses c
                join users u on u.role = 1 and u.id = c.instructorId  
                where u.id = ? and c.id = ?;`,
                {
                    replacements: [userId, courseId],
                    type: QueryTypes.SELECT,
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async getScoreByCourseId(userId, courseId) {
        try {
            const response = await sequelize.query(
                `select ts.id,ts.title,sum(qu.marks) as marks,count(qu.id) as quizNum, num.total from topics ts
                join quizzes qi on qi.topicId = ts.id
                join questions qu on qu.quizId = qi.id
                join choices ch on ch.questionId = qu.id
                join userquestions uq on uq.choiceId = ch.id
                join (select ts.id,count(qu.id) as total from topics ts
                join quizzes qi on qi.topicId = ts.id
                join questions qu on qu.quizId = qi.id  where qi.shown = 1 group by ts.id) as num on num.id = ts.id
                where ts.courseId = ${courseId} and ch.isAnswer = 1 and uq.userId = ${userId} group by ts.id;`,
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
    static async getCourseDetails(userId, courseId) {
        try {
            const response = await sequelize.query(
                `select c.id, c.name,c.description, c.categoryId,c.imageUrl,
                concat(u.firstName, " ", u.lastName) as instructorName,
                u.phoneNumber, u.address
                from courses c 
                join categories ca on ca.id = c.categoryId 
                join users u on u.id = c.instructorId
                where c.id = ${courseId} `,
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
