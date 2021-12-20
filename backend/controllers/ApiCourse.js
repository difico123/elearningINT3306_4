const cloudinary = require('../config/cloud/cloudinary');
const { pagination } = require('../utils/feature');
const {
    User,
    Course,
    Category,
    UserCourse,
    Notification,
} = require('../db/models');
const CourseService = require('../dbService/courseService');
const UserService = require('../dbService/userService');
const UserCourseService = require('../dbService/userCourseService');
const TopicService = require('../dbService/topicService');
const QuizService = require('../dbService/quizService');

module.exports = class ApiCourse {
    // @route   POST api/course/create/:categoryId
    // @desc    Create course
    // @access  Private
    static async createCourse(req, res) {
        const course = {
            categoryId: req.categoryId,
            instructorId: req.user.id,
            name: req.body.name,
            description: req.body.description,
        };
        try {
            if (req.file !== undefined) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'courses',
                });
                course.imageUrl = `${result.secure_url} ${result.public_id}`;
            }

            await Course.create(course).then((course) => {
                res.status(201).json({
                    error: false,
                    msg: 'Tạo khoá học thành công',
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   PUT api/course/activate/:id
    // @desc    activate course
    // @access  Private
    static async activateCourse(req, res) {
        const courseId = req.params.courseId;
        try {
            let course = await Course.findOne({ where: { id: courseId } });
            if (course.verified) {
                return res.status(400).json({
                    error: true,
                    msg: 'Khoá học này đã được kích hoạt từ trước',
                });
            } else {
                course.verified = true;
                await course.save();
                return res.status(200).json({
                    error: false,
                    msg: 'Khoá học này đã được kích hoạt',
                });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   PUT api/course/suspend/:id
    // @desc    Suspend course
    // @access  Private
    static async suspendCourse(req, res) {
        const courseId = req.params.courseId;
        try {
            let course = await Course.findOne({ where: { id: courseId } });
            if (!course.verified) {
                return res.status(400).json({
                    error: true,
                    msg: 'Khoá học này đã được tạm dừng từ trước',
                });
            } else {
                course.verified = false;

                await course.save();

                return res.status(200).json({
                    error: false,
                    msg: 'Khoá học này đã được tạm dừng',
                });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   PUT api/course/edit/:courseId
    // @desc    edit course
    // @access  Private
    static async edit(req, res) {
        let { name, description } = req.body;
        let { courseId } = req.params;

        try {
            let course = await Course.findOne({ where: { id: courseId } });

            if (req.file !== undefined) {
                let { imageUrl } = course;
                if (imageUrl) {
                    await cloudinary.uploader.destroy(imageUrl.split(' ')[1]);
                }

                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'courses',
                });

                course.imageUrl = `${result.secure_url} ${result.public_id}`;
            }

            course.name = name;
            course.description = description;

            await course.save();

            if (course.imageUrl) {
                course.imageUrl = course.imageUrl.split(' ')[0];
            }
            res.status(200).json({
                error: false,
                msg: 'Khoá học đã được sửa thành công',
                course: course,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   PUT api/course/delete/:courseId
    // @desc    delete course
    // @access  Private
    static async delete(req, res) {
        let { courseId } = req.params;
        try {
            let course = await Course.findOne({ where: { id: courseId } });

            if (course.imageUrl) {
                let cloudinary_id = course.imageUrl.split(' ')[1];
                await cloudinary.uploader.destroy(cloudinary_id);
            }

            await course.destroy();

            res.status(200).json({
                error: false,
                msg: 'Đã xoá khoá học ',
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/course/instructorCourses
    // @desc    show instructor'courses
    // @access  Private
    static async getCourses(req, res) {
        try {
            // let courses = await Course.findAll({
            //     where: { instructorId: req.user.id },
            // });
            let { page, keyword } = req.query;
            let courses = await CourseService.getInstructorCourses(req.user.id,keyword);
            // let instructor = await User.findOne({
            //     where: { id: req.user.id },
            // });

            courses.map((course) => {
                if (course.imageUrl) {
                    course.imageUrl = course.imageUrl.split(' ')[0];
                }
            });
            courses = courses == null ? 'Bạn chưa có khoá học nào' : courses;
            let courseRes = pagination(courses, page);
            res.status(200).json({
                error: false,
                // instructor,
                courses: courseRes,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
    // @route   GET api/course/instructorCourses/:courseId
    // @desc    show instructor'course details
    // @access  Private
    static async getCourseDetails(req, res) {
        let { courseId } = req.params;
        try {
            let course = (await CourseService.getSingleCourse(courseId))[0];
            if (course.imageUrl) {
                course.imageUrl = course.imageUrl.split(' ')[0];
            }

            let topics = await TopicService.getTopicNames(courseId);

            res.status(200).json({
                error: false,
                course: course,
                topics,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/course/instructorCourse/:courseId
    // @desc    show single instructor'course
    // @access  Private
    static async getSingleCourse(req, res) {
        let course = {};
        try {
            CourseService.getSingleInstructorCourse(
                req.user.id,
                req.params.courseId,
            ).then(async (data) => {
                if (!data[0]) {
                    return res.status(400).json({
                        error: true,
                        msg: 'Bạn không có khoá học này',
                    });
                }
                course = data[0];
                let courseTopics = [];
                await TopicService.getCourseTopicTitles(
                    req.params.courseId,
                ).then((topics) => {
                    if (topics.length === 0) {
                    } else {
                        courseTopics = topics;
                    }
                });
                course.topics = courseTopics;

                res.status(200).json({
                    error: false,
                    data: course,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/course/show
    // @desc    show instructor'courses
    // @access  Private
    static async showSingleCourse(req, res) {
        try {
            CourseService.getCoursesByInstructorId(req.user.id).then((data) => {
                if (data.length == 0) {
                    return res.status(200).json({
                        error: false,
                        msg: 'Bạn chưa có khoá học nào',
                    });
                }
                res.status(200).json({
                    error: false,
                    data,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/course/showAll
    // @desc    show all courses
    // @access  public
    static async showAll(req, res) {
        let query = {
            keyword: req.query.keyword,
            rating: req.query.rating,
            categoryId: req.query.categoryId,
        };
        try {
            CourseService.getAll(query).then((data) => {
                let page = req.query.page || 1;
                let courses = pagination(data, page);
                for (let i in courses) {
                    if (courses[i].imageUrl) {
                        courses[i].imageUrl = courses[i].imageUrl.split(' ')[0];
                    }
                    courses[i].rating = !courses[i].rating
                        ? '0'
                        : courses[i].rating;
                }

                res.status(200).json({
                    error: false,
                    courses,
                    filteredCourse: courses.length,
                    currentPage: req.query.page,
                    totalCourse: data.length,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/course/showDetail/:courseId
    // @desc    show all courses
    // @access  public
    static async showDetail(req, res) {
        const { courseId } = req.params;
        try {
            CourseService.getSingleCourse(courseId).then((data) => {
                let course = data[0];

                if (course.imageUrl) {
                    course.imageUrl = course.imageUrl.split(' ')[0];
                }

                TopicService.getShortTopic(courseId).then((topics) => {
                    res.status(200).json({
                        error: false,
                        course,
                        topics,
                    });
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/course/getUsers/:courseId
    // @desc    Get all users in the course
    // @access  private
    static async showUsers(req, res) {
        let { courseId } = req.params;
        let page = parseInt(req.query.page);
        try {
            let course = await Course.findOne({ where: { id: courseId } });

            await UserCourseService.getUsersbyCourseId(courseId).then(
                (data) => {
                    for(let i = 0; i < data.length; i++) {
                        if (data[i].imageUrl) {
                            data[i].imageUrl = data[i].imageUrl.split(' ')[0];
                        }
                    }
                    let users = pagination(data, page, 6);
                    return res.status(200).json({
                        error: false,
                        course: course,
                        users,
                        currentPage: page || 1,
                    });
                },
            );
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   PUT api/course/:courseId/kick/:userId
    // @desc    kickUser
    // @access  private
    static async kickUser(req, res) {
        let { courseId, userId } = req.params;
        try {
            let courseUser = await UserCourse.findOne({
                where: { courseId: courseId, userId: userId },
            });

            if (!courseUser) {
                return res.status(400).json({
                    error: true,
                    msg: ['Không có học sinh này trong khoá học'],
                });
            }
            await Notification.destroy({ where: { courseId, userId: userId } });

            await courseUser
                .destroy()
                .then(() => {
                    return res.status(200).json({
                        error: false,
                        msg: ['Bạn đã đuổi học sinh này ra khỏi khoá học'],
                    });
                })
                .catch(() => {
                    return res.status(400).json({
                        error: false,
                        msg: ['Không có user này'],
                    });
                });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   PUT api/course/:courseId/invite/:userId
    // @desc    invite student
    // @access  private
    static async invite(req, res) {
        let { userId, courseId } = req.params;

        let userCourse = {
            userId: userId,
            courseId: parseInt(courseId),
        };
        try {
            let user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(400).json({
                    error: true,
                    msg: 'Không có user này',
                });
            }

            await Notification.update({isConfirmed: 1}, {where: {courseId: courseId, userId: userId}})

            let course = await Course.findOne({ where: { id: courseId } });
            let type = 1;
            let details = `Bạn vừa được giảng viên mời vào ${course.name}`;

            let notification = {
                courseId: courseId,
                userId: userId,
                type,
                details,
                isConfirmed: 1,
            };

            await Notification.create(notification);

            await UserCourse.create(userCourse)
                .then(() => {
                    return res.status(200).json({
                        error: false,
                        msg: ['Bạn đã thêm học sinh mới vào khoá học này'],
                    });
                })
                .catch(() => {
                    return res.status(400).json({
                        error: true,
                        msg: 'Bạn đã thêm học sinh này rồi!',
                    });
                });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   PUT api/course/:courseId/findUsers
    // @desc    findUsers
    // @access  private
    static async findUsers(req, res) {
        let { keyword } = req.query;
        let { courseId } = req.params;
        keyword = keyword || '';
        try {
            UserService.getUserbyEmail(keyword, courseId).then((students) => {
                return res.status(200).json({
                    error: false,
                    students,
                    filteredUser: students.length,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   PUT api/course/:courseId/findUsers
    // @desc    findUsers
    // @access  private
    static async rank(req, res) {
        try {
            QuizService.rank(req.params.courseId).then((students) => {
                return res.status(200).json({
                    error: false,
                    students,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
