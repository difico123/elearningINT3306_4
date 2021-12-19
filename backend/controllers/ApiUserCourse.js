const { pagination } = require('../utils/feature');
const {
    User,
    Course,
    Category,
    UserCourse,
    Notification,
} = require('../db/models');
const UserCourseService = require('../dbService/userCourseService');

module.exports = class ApiCourse {
    // @route   GET api/userCourse/enroll/:courseId
    // @desc    check enroll a course by student
    // @access  private
    static async checkEnrollCourse(req, res, next) {
        let courseId = req.params.courseId;
        let studentId = req.user.id;
        let role = req.user.role;
        try {
            let course = await Course.findOne({ where: { id: courseId } });

            if (!course || !course.verified || role === 1 || role == 2) {
                return res.status(400).json({
                    error: true,
                    msg: ['Bạn không thể đăng kí khoá học này'],
                });
            }

            let notification = await Notification.findOne({
                where: { courseId: courseId, userId: studentId },
            });
            if (notification) {
                return res.status(403).json({
                    error: true,
                    msg: ['Bạn đã đăng kí, chờ giảng viên của bản chấp thuận!'],
                });
            } else {
                req.instructorId = course.instructorId;
                let { url } = req;

                if (url.includes('/enroll/check/')) {
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

    static async checkBtnEnrollCourse(req, res, next) {
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
            return res.status(400).json({
                error: true,
                msg: ['ok'],
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
    // @route   GET api/userCourse/:courseId
    // @desc    check enroll a course
    // @access  private
    static async checkCourse(req, res, next) {
        let courseId = req.params.courseId;
        let userId = req.user.id;
        try {
            let course = await Course.findOne({ where: { id: courseId } });

            if (!course || !course.verified) {
                return res.status(400).json({
                    error: true,
                    msg: ['Bạn không thể đăng kí khoá học này'],
                });
            }

            let userCourse = await UserCourse.findOne({
                where: { courseId: courseId, userId: userId },
            });
            if (userCourse || course.instructorId == userId) {
                return res.status(200).json({
                    error: false,
                    msg: ['oke!'],
                });
            } else {
                return res.status(400).json({
                    error: true,
                    msg: ['Bạn phải đăng kí khoá học này trước đã'],
                });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/userCourse/checkInstructor/:courseId
    // @desc    check instructor enroll a course
    // @access  private
    static async checkInstructorEnroll(req, res, next) {
        let courseId = req.params.courseId;
        try {
            UserCourseService.checkOtherInstructor(req.user.id, courseId).then(
                (v) => {
                    if (v[0]) {
                        return res.status(403).send({ error: true });
                    } else {
                        return res.status(200).send({ error: false });
                    }
                },
            );
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/userCourse/enroll/:courseId
    // @desc    enroll a course by student
    // @access  private
    static async enroll(req, res) {
        let { courseId } = req.params;
        let studentId = req.user.id;
        try {
            let user = await User.findOne({ where: { id: studentId } });

            let details = `${user.email} vừa đăng kí khoá học của bạn`;

            let notification = {
                courseId: courseId,
                userId: studentId,
                type: 0,
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
            let userCourse = await UserCourse.findOne({
                where: { courseId: courseId, userId },
            });

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
            let { page, keyword } = req.query;
            let { id } = req.user;

            let userCourse = await UserCourseService.getUserCourses(id, keyword);

            let courses = pagination(userCourse, page);

            for (let i in courses) {
                if (courses[i].imageUrl) {
                    courses[i].imageUrl = courses[i].imageUrl.split(' ')[0];
                }
            }

            res.status(200).json({
                error: false,
                courses: courses,
                filteredCourse: courses.length,
                totalCourse: userCourse.length,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   Get api/userCourse/all
    // @desc    get the list of user courses
    // @access  private
    static async getSingleCourse(req, res) {
        try {
            let course = (await UserCourseService.getCourseDetails(req.user.id, req.params.courseId))[0]

            if (course.imageUrl) {
                course.imageUrl = course.imageUrl.split(' ')[0];
            }

            res.status(200).json({
                error: false,
                course: course,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   Get api/userCourse/all
    // @desc    get the list of user courses
    // @access  private
    static async getCourseScore(req, res) {
        try {
            let { id } = req.user;
            let { page } = req.query;
            let userCourse = await UserCourseService.getScoreByCourseId(id, req.params.courseId);

            let topics = pagination(userCourse, page, 5);

            res.status(200).json({
                error: false,
                topics
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   Get api/userCourse/getRating/:courseId
    // @desc    get the list of user courses
    // @access  private
    static async getRating(req, res) {
        try {
            await UserCourse.findOne({
                where: { userId: req.user.id, courseId: req.params.courseId },
                attributes: ['rating'],
            }).then((rating) => {
                res.status(200).json({
                    error: false,
                    rating: rating.rating
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
