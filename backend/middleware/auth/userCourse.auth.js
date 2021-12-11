const { User, UserCourse, Course } = require('../../db/models');

module.exports = async function (req, res, next) {
    try {
        //check if user in this course
        let courseId =
            req.params.courseId === undefined
                ? req.courseId
                : req.params.courseId;
        let { id } = req.user;

        let userCourse = await UserCourse.findOne({
            where: { userId: id, courseId },
        });
        let course = await Course.findOne({
            where: { instructorId: id },
        });
        if (!userCourse && !course) {
            return res.status(403).json({
                error: true,
                msg: 'Bạn chưa đăng kí khoá học này',
            });
        }

        next();
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
};
