const userService = require('../services/user.service');
const checkRole = (roles) => async (req, res, next) => {
    const user = await userService.getUserById(req.user.userId);
    if (!roles.includes(user.role)) {
        res.status(403).json({
            message: "Access Denied."
        });
        return;
    }
    next();
}

module.exports = checkRole;