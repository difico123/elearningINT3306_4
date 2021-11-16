const cloudinary = require('../config/cloud/cloudinary');
const { pagination } = require('../utils/feature');
<<<<<<< HEAD
const {User, Course, Category } = require('../db/models');
=======
const { Course, Category } = require('../db/models');
>>>>>>> 821a4b9 (init express sequelize mysql)

module.exports = class ApiCourse {
    // @route   POST api/course/create/:categoryId
    // @desc    Create course
    // @access  Private
    static async createCourse(req, res) {
        const course = {
            categoryId: req.params.categoryId,
            instructorId: req.user.id,
            name: req.body.name,
            description: req.body.description,
        };
        try {
            let category = await Category.findOne({
                where: { id: req.params.categoryId },
            });
            if (!category) {
                return res.status(404).json({
                    error: true,
                    msg: 'Loại khoá học không hợp lệ',
                });
            }
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
                    course: course,
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
<<<<<<< HEAD
        const courseId = req.params.courseId;
        try {
            let course = await Course.findOne({where :{ id: courseId}});
            if(course.verified) {
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
=======
        const instructorId = req.user.id;
        const courseId = req.params.courseId;
        const activeStatus = 1;
        try {
            CourseService.CourseStatus(
                instructorId,
                courseId,
                activeStatus,
            ).then((updated) => {
                if (!updated) {
                    return res.status(400).json({
                        error: true,
                        msg: 'Bạn chưa kích hoạt được khoá học',
                    });
                }
                res.status(200).json({
                    error: false,
                    msg: 'Khoá học đã được kích hoạt thành công',
                });
            });
>>>>>>> 821a4b9 (init express sequelize mysql)
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   PUT api/course/suspend/:id
    // @desc    Suspend course
    // @access  Private
    static async suspendCourse(req, res) {
<<<<<<< HEAD
        const courseId = req.params.courseId;
        try {
            let course = await Course.findOne({where :{ id: courseId}});
            if(!course.verified) {
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
=======
        const instructorId = req.user.id;
        const courseId = req.params.courseId;
        const suspendStatus = 0;
        try {
            CourseService.CourseStatus(
                instructorId,
                courseId,
                suspendStatus,
            ).then((updated) => {
                if (!updated) {
                    return res.status(400).json({
                        error: false,
                        msg: 'Chưa tạm dừng khoá học',
                    });
                }
                res.status(200).json({
                    error: false,
                    msg: 'Khoá học đã được tạm dừng thành công',
                });
            });
>>>>>>> 821a4b9 (init express sequelize mysql)
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   PUT api/course/edit/:courseId
    // @desc    edit course
    // @access  Private
    static async edit(req, res) {
<<<<<<< HEAD
        let {name,description} = req.body;
        let {courseId} = req.params;

        try {
            let course = await Course.findOne({ where: { id: courseId}});

            if (req.file !== undefined) {
                let { imageUrl } = course;
                if (imageUrl) {
                    await cloudinary.uploader.destroy(
                        imageUrl.split(' ')[1],
                    );
                }

=======
        const newCourse = {
            id: req.params.courseId,
            instructor: req.user.id,
            name: req.body.name,
            des: req.body.des,
        };

        try {
            if (req.file !== undefined) {
                await CourseService.getCourseById(req.params.courseId).then(
                    async (data) => {
                        let { imageUrl } = data[0];
                        if (imageUrl) {
                            await cloudinary.uploader.destroy(
                                imageUrl.split(' ')[1],
                            );
                        }
                    },
                );
>>>>>>> 821a4b9 (init express sequelize mysql)
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'courses',
                });

<<<<<<< HEAD
                course.imageUrl = `${result.secure_url} ${result.public_id}`;
            }

            course.name = name;
            course.description = description;

            await course.save();
            
            if(course.imageUrl) {
                course.imageUrl = course.imageUrl.split(' ')[0]
            }
            res.status(200).json({
                error: false,
                msg: 'Khoá học đã được sửa thành công',
                course: course,
=======
                newCourse.imageUrl = `${result.secure_url} ${result.public_id}`;
            }

            CourseService.updateCourse(newCourse).then((updated) => {
                if (!updated) {
                    return res.status(400).json({
                        error: true,
                        msg: 'Bạn chưa sửa được khoá học',
                    });
                }
                res.status(200).json({
                    error: false,
                    msg: 'Khoá học đã được sửa thành công',
                    course: newCourse,
                });
>>>>>>> 821a4b9 (init express sequelize mysql)
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/course/image/:courseId
    // @desc    show course image
    // @access  Public
    static showImg(req, res) {
        CourseService.getCourseById(req.params.courseId).then((course) => {
            if (!course[0]) {
                return res.status(404).json({
                    error: true,
                    msg: 'Không tìm thấy khoá học',
                });
            }

            if (!course[0].imageUrl) {
                return res.status(200).json({
                    error: false,
                    msg: 'Không có đường dẫn ảnh khoá học',
                });
            }

            let imageUrl = course[0].imageUrl.split(' ')[0];
            return res.status(404).json({
                error: false,
                link: imageUrl,
            });
        });
    }

    // @route   PUT api/course/edit/:courseId
    // @desc    edit course
    // @access  Private
    static async delete(req, res) {
        try {
            await CourseService.getCourseById(req.params.courseId).then(
                async (course) => {
                    if (course[0].imageUrl) {
                        let cloudinary_id = course[0].imageUrl.split(' ')[1];
                        await cloudinary.uploader.destroy(cloudinary_id);
                    }
                },
            );
            //get user information by id
            CourseService.deleteCourseById(req.params.courseId).then((data) => {
                if (!data) {
                    return res.status(400).json({
                        error: true,
                        msg: 'Không xoá được khoá học',
                    });
                }
                res.status(200).json({
                    error: false,
                    msg: 'Đã xoá khoá học ',
                });
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
            let courses = await Course.findAll({
<<<<<<< HEAD
                where: { instructorId: req.user.id }
            });
            let instructor = await User.findOne({
                where: { id: req.user.id }
            });
            courses = courses == null ? 'Bạn chưa có khoá học nào' : courses;
            res.status(200).json({
                error: false,
                instructor,
=======
                where: { instructorId: req.user.id },
                include: 'categories',include: 'users',
            });

            courses = courses == null ? 'Bạn chưa có khoá học nào' : courses;
            res.status(200).json({
                error: false,
>>>>>>> 821a4b9 (init express sequelize mysql)
                courses: courses,
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
        };
        try {
            CourseService.getAll(query).then((data) => {
                if (data.length == 0) {
                    return res.status(200).json({
                        error: false,
                        msg: 'Không có khoá học nào',
                    });
                }
                let page = req.query.page || 1;
                let courses = pagination(data, page);
                res.status(200).json({
                    error: false,
                    courses,
                    filteredCourse: courses.length,
                    currentPage: req.query.page,
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
        try {
            let info = {};
            await CourseService.getCourseInstructorByCourceId(
                req.params.courseId,
            ).then((instructorCourses) => {
                info.course = instructorCourses[0];
            });
            let users = [];
            await UserCourseService.getCourseUsers(req.params.courseId).then(
                (data) => {
                    if (data.length == 0) {
                        users.push('Không có học sinh nào trong khoá học');
                    }
                    users = [...data];
                },
            );
            return res.status(200).json({
                error: false,
                course: info.course,
                users,
                total: users.length,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
