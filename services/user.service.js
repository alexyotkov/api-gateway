const db = require('../models');
const User = db['User'];
const userService = {};

/**
 * Creates a new user in the database.
 *
 * @async
 * @function createUser
 * @param {Object} params - The parameters for creating a user.
 * @param {string} params.username - The user's username.
 * @param {string} params.email - The user's email.
 * @param {string} params.password - The user's password (hashed).
 * @param {string} params.role - The user's role.
 * @returns {Promise<Object>} The created user object or an error.
 */
userService.createUser = async ({ username, email, password, role }) => {
    try {
        const user = await User.create({
            username: username,
            email: email,
            password: password,
            role: role
        });
        return user;
    } catch (error) {
        return error;
    }
}

/**
 * Retrieves a user from the database by their email.
 *
 * @async
 * @function getUserByEmail
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<Object|null>} The user object if found, or null if not found, or an error.
 */
userService.getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email: email } });
        return user;
    } catch (error) {
        return error;
    }
}

/**
 * Retrieves a user from the database by their ID.
 *
 * @async
 * @function getUserById
 * @param {number|string} id - The ID of the user to retrieve.
 * @returns {Promise<Object|null>} The user object if found, or null if not found, or an error.
 */
userService.getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        return error;
    }
}

module.exports = userService;
