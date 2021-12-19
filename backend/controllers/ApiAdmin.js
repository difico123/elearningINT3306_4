const cloudinary = require('cloudinary');
const AdminService = require('../dbService/adminService');
const { User, Course, UserCourse } = require('../db/models');
const jwt = require('jsonwebtoken');
const { pagination } = require('../utils/feature');
const bcrypt = require('bcryptjs');

module.exports = class ApiAdmin {
    // @route   DELETE api/admin/delete/:userId
    // @desc    Delete user by admin
    // @access  Private
    static async deleteUser(req, res) {
        try {
            //get user information by id
            let { userId } = req.params;
            let userPromise = UserService.getUserInfoById(userId).then(
                async (data) => {
                    if (!data[0]) {
                        return res.status(400).json({
                            error: true,
                            msg: 'Không tìm thấy user',
                        });
                    }
                    if (data[0].imageUrl) {
                        await cloudinary.uploader.destroy(
                            data[0].imageUrl.split(' ')[1],
                        );
                    }

                    if (data[0].role === 1) {
                        CourseService.deleteIntructorCourses(data[0].id).then(
                            (deleted) => {
                                if (!deleted) {
                                    return res.status(400).json({
                                        error: false,
                                        msg: 'Chưa xoá khoá học của instructor',
                                    });
                                }
                                console.log('đã xoá khoá học của instructor');
                            },
                        );
                    }
                },
            );
            let deletePromise = UserService.deleteUserById(userId).then(
                (data) => {
                    if (!data) {
                        return res.status(400).json({
                            error: 'Không xoá được user',
                        });
                    }
                    return res.status(200).json({
                        error: false,
                        msg: 'Đã xoá user',
                    });
                },
            );

            Promise.all([userPromise, deletePromise]);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   DELETE api/admin/deleteCourse/:courseId
    // @desc    Delete course by admin
    // @access  Private
    static async deleteCourse(req, res) {
        try {
            //get user information by id
            let { courseId } = req.params;

            let course = await Course.findOne({ where: { id: courseId } });

            if (course.imageUrl) {
                let cloudinary_id = course.imageUrl.split(' ')[1];
                await cloudinary.uploader.destroy(cloudinary_id);
            }
            let instructor = await User.findOne({
                where: { id: course.instructorId },
            });

            if (instructor.imageUrl) {
                let cloudinary_id = instructor.imageUrl.split(' ')[1];
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

    // @route   GET api/admin/listUsers
    // @desc    get users by admin
    // @access  Private
    static async listUsers(req, res) {
        try {
            let users = await AdminService.getUsers();
            users.map((user) => {
                if (user.imageUrl) {
                    user.imageUrl = user.imageUrl.split(' ')[0];
                }
            });
            return res.status(200).json({ error: false, users });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/admin/setInstructor/:userId
    // @desc    get users by admin
    // @access  Private
    static async beInstructor(req, res) {
        try {
            await UserCourse.destroy({where: {userId: req.params.userId}})
            await User.update({ role: 1 }, { where: { id: req.params.userId } })
                .then(() => {
                    return res
                        .status(200)
                        .json({
                            error: false,
                            msg: 'user này đã trở thành giảng viên',
                        });
                })
                .catch(() => {
                    return res.status(400).json({ error: true });
                });


        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/admin/statistic
    // @desc    get users by admin
    // @access  Private
    static async statistic(req, res) {
        try {
            AdminService.getStatistic().then((data) => {
                return res
                    .status(200)
                    .json({ error: false, statistic: data[0] });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/user/listCourses
    // @desc    get listcourses by admin
    // @access  Private
    static async listCourses(req, res) {
        // let { page } = req.query;
        try {
            let courses = await AdminService.getCourses();
            courses.map((course) => {
                if (course.courseImg) {
                    course.courseImg = course.courseImg.split(' ')[0];
                }
                if (course.avt) {
                    course.avt = course.avt.split(' ')[0];
                }
            });
            // courses = pagination(courses, page);
            return res.status(200).json({ error: false, courses });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   POST api/admin/login
    // @desc    login user
    // @access  Public
    static async login(req, res) {
        let { email, password } = req.body;
        //find user
        try {
            let user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({
                    error: true,
                    msg: ['Tài khoàn này không tồn tại'],
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    error: true,
                    msg: ['Mật khẩu của bạn không chính xác'],
                });
            }
            if (user.role !== 2) {
                return res.status(400).json({
                    error: true,
                    msg: ['Bạn phải đăng nhập bằng tài khoản admin'],
                });
            }
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;

                    if (user.imageUrl) {
                        user.imageUrl = user.imageUrl.split(' ')[0];
                    }
                    return res.status(200).json({
                        error: false,
                        token,
                        user: user,
                    });
                },
            );
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
