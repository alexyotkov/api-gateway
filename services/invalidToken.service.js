const db = require('../models');
const InvalidToken = db['InvalidToken'];
const invalidTokenService = {};

/**
 * Creates a new invalid token entry in the database.
 *
 * @async
 * @function createInvalidToken
 * @param {Object} params - The parameters for creating an invalid token.
 * @param {string} params.token - The invalid token string.
 * @param {number} params.userId - The ID of the user associated with the invalid token.
 * @param {number} params.exp - The expiration time of the token.
 * @returns {Promise<Object>} The created invalid token object or an error.
 */
invalidTokenService.createInvalidToken = async ({token, userId, exp}) => {
    try {
        const invalidToken = await InvalidToken.create({
            token: token,
            userId: userId,
            exp: exp
        });

        return invalidToken;
    } catch (error) {
        return error;
    }
}

/**
 * Retrieves an invalid token entry from the database.
 *
 * @async
 * @function getInvalidToken
 * @param {string} token - The invalid token string to search for.
 * @returns {Promise<Object|null>} The invalid token object if found, or null if not found, or an error.
 */
invalidTokenService.getInvalidToken = async (token) => {
    try {
        const invalidToken = await InvalidToken.findOne({ where: { token: token } });
        return invalidToken;
    } catch (error) {
        return error;
    }
}

module.exports = invalidTokenService;
