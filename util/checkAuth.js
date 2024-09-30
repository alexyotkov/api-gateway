const jwt = require("jsonwebtoken");
const invalidTokenService = require("../services/invalidToken.service");

/**
 * Middleware to check if the user is authenticated using an access token.
 *
 * This function checks for a valid JWT token in the request headers and ensures
 * that the token has not been invalidated. If the token is valid, it attaches the decoded
 * user information to the request object for further processing.
 *
 * @param {Object} req - Express request object
 * @param {Object} req.headers - HTTP headers from the request
 * @param {string} req.headers.authorization - Authorization header containing the access token
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {void|Response} - Returns a response if authentication fails, otherwise calls next() to proceed
 */
const checkAuth = async (req, res, next) => {

    // Check if authorization header is missing
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'Access token is missing.'
        });
    }

    try {
        const accessToken = req.headers.authorization.split(' ')[1];

        // Check if token is in the invalid tokens list
        const invalidToken = await invalidTokenService.getInvalidToken(accessToken);

        if (invalidToken) {
            return res.status(401).json({
                message: 'Access token is invalid.',
                code: 'INVALID_ACCESS_TOKEN'
            });
        }

        // Verify token using JWT and extract payload
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        // Attach token and user information to the request object
        req.accessToken = { value: accessToken, exp: decoded.exp };
        req.user = { userId: decoded.userId };

        next(); // Proceed to the next middleware or route handler

    } catch (error) {

        // Handle token expiration
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: 'Access token is expired.',
                code: 'ACCESS_TOKEN_EXPIRED'
            });
        }

        // Handle invalid token errors
        else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: 'Access token is invalid.',
                code: 'INVALID_ACCESS_TOKEN'
            });
        }

        // Handle unexpected errors
        else {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = checkAuth;
