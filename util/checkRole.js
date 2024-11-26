const userService = require('../services/user.service');

/**
 * Middleware to check if the user's role is included in the allowed roles.
 *
 * @param {Array<string>} roles - An array of roles that are allowed access.
 * @returns {Function} The middleware function.
 */
const checkRole = (roles) => async (req, res, next) => {
    const user = await userService.getUserById(req.user.userId);
    if (!roles.includes(user.role)) {
        return res.status(403).json({
            message: "Access Denied."
        });
    }
    next();
}

module.exports = checkRole;