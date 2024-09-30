const userService = require('../services/user.service');
const checkEmail = require('../util/checkEmail');
const checkPassword = require('../util/checkPassword');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const refreshTokenService = require('../services/refreshToken.service');
const invalidTokenService = require("../services/invalidToken.service");

const userController = {};

userController.registerUser = async (req, res) => {
    try {
        const {username, email, password, role} = req.body;

        if (!username || !email || !password || !checkEmail(email) || !checkPassword(password)) {
            res.status(422).json({
                message: 'Invalid input. Please enter a valid username, email and password.'
            });
            return;
        }

        if (await userService.getUserByEmail(email)) {
            res.status(409).json({
                message: 'User with that email already exists.'
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userService.createUser({username, email, password: hashedPassword, role});
        res.status(201).json({
            message: 'User created successfully',
            userId: user.id
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

userController.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password || !checkEmail(email) || !checkPassword(password)) {
            res.status(422).json({
                message: 'Invalid input. Please enter a valid email and password.'
            });
            return;
        }

        const user = await userService.getUserByEmail(email);

        if (!user) {
            res.status(401).json({
                message: "Invalid email or password."
            })
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            res.status(401).json({
                message: "Invalid email or password."
            })
            return;
        }

        const accessToken = jwt.sign({userId: user.id}, process.env.ACCESS_TOKEN_SECRET, {
            subject: 'accessApi',
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        });
        const refreshToken = jwt.sign({userId: user.id}, process.env.REFRESH_TOKEN_SECRET, {
            subject: 'refreshToken',
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        });

        await refreshTokenService.createRefreshToken({refreshToken, userId: user.id});

        return res.status(200).json({
            userId: user.id,
            username: user.username,
            email: user.email,
            accessToken: accessToken,
            refreshToken: refreshToken
        });


    } catch (error) {
        res.status(500).json({
userController.refreshToken = async (req, res) => {
    try {
        const {refreshToken} = req.body;

        if (!refreshToken) {
            return res.status(422).json({
                message: 'Refresh token is missing.'
            });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const userRefreshToken = await refreshTokenService.getRefreshToken({
            refreshToken: refreshToken,
            userId: decoded.userId
        });

        if (!userRefreshToken) {
            return res.status(401).json({
                message: 'Refresh token is invalid.'
            });
        }

        await refreshTokenService.deleteRefreshToken(userRefreshToken.id);

        const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {
            subject: 'accessApi',
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        });

        const newRefreshToken = jwt.sign({userId: decoded.userId}, process.env.REFRESH_TOKEN_SECRET, {
            subject: 'refreshToken',
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        });

        await refreshTokenService.createRefreshToken({refreshToken: newRefreshToken, userId: decoded.userId});

        return res.status(200).json({
            accessToken: accessToken,
            refreshToken: newRefreshToken
        });

    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError|| error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: 'Refresh token is invalid or expired.'
            });
        }

        return res.status(500).json({
            message: error.message
        });
    }
}

/**
 * Logs out a user by deleting the refresh tokens and invalidating the access token.
 *
 * @async
 * @function logout
 * @memberof userController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response with a status code of 204, or an error message.
 */
userController.logout = async (req, res) => {
    try {
        await refreshTokenService.deleteRefreshTokenForUser(req.user.userId);

        await invalidTokenService.createInvalidToken({
            token: req.accessToken.value,
            userId: req.user.userId,
            exp: req.accessToken.exp
        });

        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = userController;