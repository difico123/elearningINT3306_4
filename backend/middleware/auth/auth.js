const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header
    const token =
        req.cookies.token === undefined
            ? req.headers['authorization']
            : req.cookies.token;

    //Check if no token
    if (!token) {
        return res.status(401).json({
            error: true,
            msg: 'No token, access denied',
        });
    }
    //Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //set user id in req.user
        req.user = decoded.user;

        next();
    } catch (error) {
        res.status(401).json({
            error: true,
            msg: 'token không hợp lệ',
        });
    }
};
