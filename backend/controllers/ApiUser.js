const bcrypt = require('bcryptjs'); // encrypt password
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloud/cloudinary');
const crypto = require('crypto');
const sendEmail = require('../utils/sendmail');
const { User } = require('../db/models');

module.exports = class ApiUser {
    // @route   POST api/auth/register
    // @desc    Register user
    // @access  Public
    static async register(req, res) {
        let { email } = req.body;
        try {
            let hasUser = await User.findOne({ where: { email } });
            if (hasUser) {
                return res.status(400).json({
                    error: true,
                    msg: ['Email này đã có người đăng kí'],
                });
            }

            const salt = await bcrypt.genSalt(10);
            let user = req.body;
            let { password } = user;
            user.password = await bcrypt.hash(password, salt);

            if (req.file !== undefined) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'avatars',
                    width: 150,
                    crop: 'scale',
                });
                user.imageUrl = `${result.secure_url} ${result.public_id}`;
            }

            await User.create(user);
            res.status(201).json({
                error: false,
                msg: ['Đăng kí tài khoản thành công'],
                user,
            });
        } catch (error) {
            res.status(500).send('server error ' + error.message);
        }
    }

    // @route   POST api/auth/login
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
            const payload = {
                user: {
                    id: user.id,
                    role: user.role,
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

    // @route   POST api/auth/logout
    // @desc    logout user
    // @access  Public
    static logout(req, res) {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            error: false,
            msg: 'Logged Out',
        });
    }

    // @route   POST api/auth/forgotPassword
    // @desc    forgot user Password
    // @access  Public
    static async forgotPassword(req, res) {
        let { email } = req.body;
        let user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                error: true,
                msg: ['Email của bạn không đúng'],
            });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        let dat = new Date();
        dat.setMinutes(dat.getMinutes() + 5);
        user.resetPasswordExpire = dat;

        await user.save();

        const resetPasswordUrl = `${req.protocol}://${req.get(
            'host',
        )}/api/auth/resetPassword/${resetToken}`;

        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
        try {
            await sendEmail({
                email: email,
                subject: `Elearning Password Recovery`,
                message,
            });

            return res.status(200).json({
                error: false,
                message: `Email sent to ${email} successfully`,
            });
        } catch (error) {
            user.resetPasswordToken = null;
            user.resetPasswordExpire = null;
            await user.save();
        }
    }

    // @route   POST api/auth/resetPassword/:token
    // @desc    reset user Password
    // @access  Public
    static async resetPassword(req, res) {
        let { newPassword, confirmPassword } = req.body;
        let { token } = req.params;

        try {
            const resetPasswordToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');

            let user = await User.findOne({
                where: { resetPasswordToken: resetPasswordToken },
            });

            if (!user) {
                return res.status(400).json({
                    error: true,
                    msg: ['token của bạn không đúng'],
                });
            }
            let dat = new Date();
            if (user.resetPasswordExpire < dat) {
                return res.status(400).json({
                    error: true,
                    msg: ['token đã hết hạn'],
                });
            }

            if (newPassword !== confirmPassword) {
                return res.status(400).json({
                    error: true,
                    msg: [
                        'Mật khẩu mới và mật khẩu xác nhận của bạn không khớp',
                    ],
                });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            user.resetPasswordExpire = null;
            user.resetPasswordToken = null;

            await user.save();

            return res.status(200).json({
                error: false,
                msg: ['mật khẩu của bạn đã được đổi thành công'],
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error');
        }
    }

    // @route   GET api/user/info
    // @desc    Get user information
    // @access  Private
    static async getInfor(req, res) {
        try {
            //get user information by id
            let { id } = req.user;
            let user = await User.findOne({ where: { id } });
            if (user.imageUrl) {
                user.imageUrl = user.imageUrl.split(' ')[0];
            }

            res.status(200).json({
                error: false,
                info: user,
                url: req.header('x-forwarded-for'),
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   PUT api/user/editInfo
    // @desc    Edit user information
    // @access  Private
    static async editInfo(req, res) {
        let { firstName, lastName, phoneNumber, address, city } = req.body;
        try {
            let user = await User.findOne({ where: { id: req.user.id } });

            if (req.file !== undefined) {
                if (user.imageUrl) {
                    await cloudinary.uploader.destroy(
                        user.imageUrl.split(' ')[1],
                    );
                }
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'avatars',
                    width: 150,
                    crop: 'scale',
                });
                user.imageUrl = `${result.secure_url} ${result.public_id}`;
            }

            user.firstName = firstName;
            user.lastName = lastName;
            user.phoneNumber = phoneNumber;
            user.address = address;
            user.city = city;

            await user.save().then((info) => {
                res.status(200).json({
                    error: false,
                    msg: ['Đã sửa thông tin của bạn'],
                    info: info,
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   PUT api/user/beALecturer
    // @desc    to be an beIntructor
    // @access  Private
    static async beALecturer(req, res) {
        try {
            let user = await User.findOne({ where: { id: req.user.id } });
            user.role = 1;
            await user.save();

            res.status(200).json({
                error: false,
                msg: ['Bạn đã trở thành giảng viên'],
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    static async checkCorrectPassword(req, res, next) {
        let { id } = req.user;

        let { password } = req.body;

        try {
            let user = await User.findOne({ where: { id } });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(404).json({
                    error: true,
                    msg: ['Mật khẩu của bạn không chính xác'],
                });
            } else {
                req.user.password = password;
                next();
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    // @route   PUT api/user/editPw
    // @desc    edit user password
    // @access  private
    static async editPw(req, res) {
        try {
            //get user information by id
            let { id, password } = req.user;

            let { confirmPassword, newPassword } = req.body;
            if (confirmPassword !== newPassword) {
                return res.status(400).json({
                    error: true,
                    msg: ['Mật khẩu xác nhận không khớp'],
                });
            }
            if (newPassword === password) {
                return res.status(400).json({
                    error: true,
                    msg: ['Mật khẩu mới phải khác mật khẩu cũ'],
                });
            }

            const salt = await bcrypt.genSalt(10);
            let user = await User.findOne({ where: { id } });

            user.password = await bcrypt.hash(newPassword, salt);

            await user.save().then(() => {
                res.status(200).json({
                    error: false,
                    msg: ['Mật khẩu của bạn đã được cập nhật'],
                });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
