const { pagination } = require('../utils/feature');
const {
    User,
    Course,
    Category,
    UserCourse,
    Notification,
} = require('../db/models');

module.exports = class ApiCourse {

    // @route   GET api/userCourse/enroll/:courseId
    // @desc    check enroll a course by student
    // @access  private
    static async checkEnrollCourse(req, res, next) {
        let courseId = req.params.courseId;
        let studentId = req.user.id;
        try {
            let course = await Course.findOne({ where: { id: courseId } });

            if (!course || !course.verified) {
                return res.status(400).json({
                    error: true,
                    msg: ['Bạn không thể đăng kí khoá học này'],
                });
            }

            let notification = await Notification.findOne({where: { receiverId: course.instructorId, senderId:studentId } });
            if (notification) {
                return res.status(400).json({
                    error: true,
                    msg: ['Bạn đã đăng kí khoá học này rồi!'],
                });
            } else {
                req.instructorId = course.instructorId;
                console.log(req.url)
                let {url} = req;

                if(url.includes("/enroll/check/")) {
                    return res.status(200).json({
                        error: false,
                        msg: ['oke'],
                    });
                } else {
                    next();
                }
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/userCourse/enroll/:courseId
    // @desc    enroll a course by student
    // @access  private
    static async enroll(req, res) {
        let instructorId = req.instructorId;
        let studentId = req.user.id;
        try {
            let user = await User.findOne({ where: { id: studentId } });

            let topic = 'Đăng ký khoá học';
            let details = `${user.email} vừa đăng kí khoá học của bạn`;

            let notification = {
                receiverId: instructorId,
                senderId: studentId,
                topic,
                details,
            };

            await Notification.create(notification).then((notification) => {
                return res.status(200).json({
                    error: false,
                    msg: 'Đã thông báo đến giáo viên, xin vui lòng chờ giáo viên của bạn chấp nhận',
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
        let rating = parseInt(req.params.rating);
        let courseId = parseInt(req.params.courseId);
        let userId = req.user.id;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                error: true,
                msg: 'Bạn phải đánh giá khoá học từ 1 - 5',
            });
        }
        try {
            let userCourse = await UserCourse.findOne({ where: { id: courseId, userId } });
            if (userCourse.rating == rating) {
                return res.status(400).json({
                    error: true,
                    msg: ['Đánh giá khoá học chưa được thay đổi'],
                });
            } else {
                userCourse.rating = `${rating}`;
                await userCourse.save();
                return res.status(200).json({
                    error: false,
                    rating: rating,
                    msg: 'Bạn đã đánh giá khoá học',
                });
            }

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

            let userCourse = await UserCourse.findAll({
                where: { UserId: id }
            });

            res.status(200).json({
                error: false,
                courses: userCourse,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
