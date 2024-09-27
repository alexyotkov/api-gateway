const jwt = require("jsonwebtoken");
const checkAuth = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'Access token is missing.'
        });
    }
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = { userId: decoded.userId };
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Access token is invalid or expired.'
        });
    }
}

module.exports = checkAuth;