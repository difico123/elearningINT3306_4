const { pagination } = require('../utils/feature');
const { User, Course, Category, UserCourse } = require('../db/models');

module.exports = class ApiCourse {
    // @route   GET api/userCourse/enroll/:courseId
    // @desc    enroll a course by student
    // @access  private
    static async enroll(req, res) {
        let courseId = req.params.courseId;
        let studentId = req.user.id;
        try {
            let course = await Course.findOne({ where: { id: courseId } });
            if (!course || !course.verified) {
                return res.status(400).json({
                    error: true,
                    msg: 'Bạn không thể đăng kí khoá học này',
                });
            }
            let userCourse = {
                userId: studentId,
                courseId: parseInt(courseId),
            };
            await UserCourse.create(userCourse)
                .then((v) => {
                    return res.status(200).json({
                        error: false,
                        msg: 'Đăng kí khoá học thành công',
                        v,
                    });
                })
                .catch(() => {
                    return res.status(400).json({
                        error: true,
                        msg: 'Bạn đã đăng kí khoá học này rồi!',
                    });
                });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   POST api/userCourse/rate/:courseId
    // @desc    rate the course
    // @access  private
    static async rate(req, res) {
        let rating = parseInt(req.body.rating);

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                error: true,
                msg: 'Bạn phải đánh giá khoá học từ 1 - 5',
            });
        }
        let userCourse = {
            rating: req.body.rating,
            user: req.user.id,
            course: req.params.courseId,
        };
        try {
            UserCourseService.update(userCourse).then((updated) => {
                if (!updated) {
                    return res.status(400).json({
                        error: true,
                        msg: 'Bạn chưa đánh giá khoá học',
                    });
                }
                res.status(200).json({
                    error: false,
                    msg: 'Bạn đã đánh giá khoá học',
                    courseId: req.params.courseId,
                    rating: req.body.rating,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   Get api/userCourse/all
    // @desc    get the list of user courses
    // @access  private
    static async getAll(req, res) {
        try {
            let { id } = req.user;

            let userCourse = await UserCourse.findAll({where: {UserId : id}})

            res.status(200).json({
                error: false,
                courses: userCourse
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
