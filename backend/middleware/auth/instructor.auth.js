const { User } = require('../../db/models');

module.exports = async function (req, res, next) {
    let { id, role } = req.user;

    try {
        // Get user information by Id
        // User.role = 1 (instructor)
        if (role != 1) {
            return res.status(403).json({
                error: true,
                msg: 'Quyền truy cập này chỉ dành cho giảng viên',
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
};
