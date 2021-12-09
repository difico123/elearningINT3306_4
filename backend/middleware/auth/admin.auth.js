const { User } = require('../../db/models');

module.exports = async function (req, res, next) {
    try {
        // Get user information by Id
        // User.role = 2 (admin)
        let { id } = req.user;
        let user = await User.findOne({ where: { id } });
        if (user.role != 2) {
            return res.status(403).json({
                error: true,
                msg: 'Quyền truy cập này chỉ dành cho admin',
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
};
