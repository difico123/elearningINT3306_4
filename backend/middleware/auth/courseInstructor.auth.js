<<<<<<< HEAD
const { User,Course } = require('../../db/models');
=======
const { User } = require('../../db/models');
>>>>>>> 821a4b9 (init express sequelize mysql)

module.exports = async function (req, res, next) {
    try {
        //check if instructor in this course
        let courseId =
            req.params.courseId === undefined
                ? req.courseId
                : req.params.courseId;

        let { id } = req.user;
<<<<<<< HEAD

        await Course.findOne({where: {instructorId: id, id: courseId}}).then(v => {
                return !v
                ? res.status(403).json({
                      error: true,
                      msg: 'Quyền truy cập này chỉ dành cho giáo viên trong khoá học',
                  })
                : next();
        })

=======
        CourseService.getSingleInstructorCourse(id, courseId).then(
            (instructorCourse) => {
                return !instructorCourse[0]
                    ? res.status(403).json({
                          error: true,
                          msg: 'Course instructor resources access denied',
                      })
                    : next();
            },
        );
>>>>>>> 821a4b9 (init express sequelize mysql)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
};
