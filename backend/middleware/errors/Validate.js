const { check } = require('express-validator');
const { validationResult } = require('express-validator');

module.exports = {
    checkUserInput: function (fields) {
        let names = ['firstName', 'lastName', 'middleName'];
        let address = ['address', 'city'];
        let password = ['password', 'confirmPassword', 'newPassword'];
        let phoneNumber = 'phoneNumber';
        let email = 'email';
        return async (req, res, next) => {
            for (let i = 0; i < fields.length; i++) {
                let name = '';
                switch (fields[i]) {
                    case 'firstName':
                        name = 'Họ';
                        break;
                    case 'middleName':
                        name = 'Tên đệm';
                        break;
                    case 'lastName':
                        name = 'Tên';
                        break;
                    case 'address':
                        name = 'Địa chỉ';
                        break;
                    case 'city':
                        name = 'Thành Phố';
                        break;
                    case 'password':
                        name = 'Mật khẩu';
                        break;
                    case 'confirmPassword':
                        name = 'Mật khẩu xác nhận';
                        break;
                    case 'newPassword':
                        name = 'Mật khẩu mới';
                        break;
                    case 'phoneNumber':
                        name = 'Số điện thoại';
                        break;
                }
                if (names.includes(fields[i])) {
                    await check(fields[i])
                        .custom((value) => !/\s/.test(value))
                        .withMessage(`${name} không được có dấu cách`)
                        .isLength({
                            min: 1,
                            max: 30,
                        })
                        .withMessage(`${name} phải chứa từ 1 - 30 kí tự`)
                        .run(req);
                } else if (fields[i] === email) {
                    await check(fields[i])
                        .isEmail()
                        .withMessage(`${email} không hợp lệ`)
                        .run(req);
                } else if (password.includes(fields[i])) {
                    await check(fields[i])
                        .custom((value) => !/\s/.test(value))
                        .withMessage(`${name} không được có dấu cách`)
                        .isLength({
                            min: 6,
                            max: 30,
                        })
                        .withMessage(`${name} phải chứa từ 6 - 30 kí tự`)
                        .run(req);
                } else if (address.includes(fields[i])) {
                    await check(fields[i])
                        .isLength({
                            min: 1,
                            max: 30,
                        })
                        .withMessage(`${name} phải chứa từ 1 - 30 kí tự`)
                        .run(req);
                } else if (fields[i] === phoneNumber) {
                    await check(fields[i])
                        .custom((value) => /^\d+$/.test(value))
                        .withMessage('Số điện thoại phải chứa ký tự số')
                        .isLength({
                            min: 6,
                            max: 10,
                        })
                        .withMessage('Số điện thoại phải chứa từ 6 - 10 ký tự')
                        .run(req);
                }
            }
            next();
        };
    },
<<<<<<< HEAD
    checkCourseInput: function (fields) {
        let names = ['name', 'title'];
        let contents = ['description', 'content'];
        return async (req, res, next) => {
                for (let i = 0; i < fields.length; i++) {
                    let name = '';
                    switch (fields[i]) {
                        case 'name':
                            name = 'Tên khoá học';
                            break;
                        case 'description':
                            name = 'Phần mô tả';
                            break;
                    }
                    if (names.includes(fields[i])) {
                        await check(fields[i])
                            .isLength({
                                min: 10,
                                max: 30,
                            })
                            .withMessage(`${name} phải chứa từ 10 kí tự trở lên`)
                            .run(req);
                    } else if (contents.includes(fields[i])) {
                        await check(fields[i])
                            .isLength({
                                min: 20
                            })
                            .withMessage(`${name} phải chứa từ 20 kí tự trở lên`)
                            .run(req);
                    }

                }
                next();
            }
        },
=======
>>>>>>> 821a4b9 (init express sequelize mysql)

    validateInput: function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: true,
                msg: errors.errors.map((item) => item.msg),
            });
        } else {
            next();
        }
    },
};
