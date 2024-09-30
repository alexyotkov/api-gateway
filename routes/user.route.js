const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const checkAuth = require("../util/checkAuth");

/**
 * User routes for registering, logging in, and logging out users.
 *
 *
 * @module routes/user
 */

/**
 * Route to register a new user.
 *
 * @name POST /register
 * @function
 * @memberof module:routes/user
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body containing user registration data.
 * @param {string} req.body.username - The user's username.
 * @param {string} req.body.email - The user's email.
 * @param {string} req.body.password - The user's password.
 * @param {string} req.body.role - The user's role.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response with the status of registration or an error message.
 */
router.post("/register", userController.registerUser);

/**
 * Route to log in a user.
 *
 * @name POST /login
 * @function
 * @memberof module:routes/user
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body containing user login data.
 * @param {string} req.body.email - The user's email.
 * @param {string} req.body.password - The user's password.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response with user data and tokens or an error message.
 */
router.post("/login", userController.loginUser);

/**
 * Route to refresh access token using a refresh token.
 *
 * @name POST /refresh-token
 * @function
 * @memberof module:routes/user
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body containing the refresh token.
 * @param {string} req.body.refreshToken - The refresh token for generating a new access token.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response with new access and refresh tokens or an error message.
 */
router.post("/refresh-token", userController.refreshToken);

/**
 * Route to log out a user, invalidating the current access token.
 *
 * @name POST /logout
 * @function
 * @memberof module:routes/user
 * @param {Object} req - Express request object.
 * @param {Object} req.user - The authenticated user's data.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} JSON response with a status code of 204 (No Content) or an error message.
 */
router.post("/logout", checkAuth, userController.logout);

module.exports = router;
