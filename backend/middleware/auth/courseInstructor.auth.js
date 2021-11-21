const { User, Course } = require('../../db/models');

module.exports = {
    courseInstructorAuth: function (isAlowed = true) {
        return async (req, res, next) => {
            try {
                //check if instructor in this course
                let courseId =
                    req.params.courseId === undefined
                        ? req.courseId
                        : req.params.courseId;

                let { id } = req.user;
                let course = await Course.findOne({
                    where: { instructorId: id, id: courseId },
                });

                if (isAlowed) {
                    if (!course) {
                        res.status(403).json({
                            error: true,
                            msg: 'Quyền truy cập này chỉ dành cho giáo viên trong khoá học',
                        });
                    } else {
                        next();
                    }
                } else {
                    if (course) {
                        res.status(403).json({
                            error: true,
                            msg: 'Bạn không có quyền truy cập vào đây!',
                        });
                    } else {
                        next();
                    }
                }
            } catch (error) {
                console.log(error.message);
                res.status(500).send('Server Error');
            }
        };
    },
};
