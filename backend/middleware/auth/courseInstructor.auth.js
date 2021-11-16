const { User,Course } = require('../../db/models');

module.exports = async function (req, res, next) {
    try {
        //check if instructor in this course
        let courseId =
            req.params.courseId === undefined
                ? req.courseId
                : req.params.courseId;

        let { id } = req.user;

        await Course.findOne({where: {instructorId: id, id: courseId}}).then(v => {
                return !v
                ? res.status(403).json({
                      error: true,
                      msg: 'Quyền truy cập này chỉ dành cho giáo viên trong khoá học',
                  })
                : next();
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
};
