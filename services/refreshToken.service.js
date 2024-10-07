const db = require('../models');
const RefreshToken = db['RefreshToken'];
const refreshTokenService = {};

/**
 * Creates a new refresh token entry in the database.
 *
 * @async
 * @function createRefreshToken
 * @param {Object} params - The parameters for creating a refresh token.
 * @param {string} params.refreshToken - The refresh token string.
 * @param {number} params.userId - The ID of the user associated with the refresh token.
 * @returns {Promise<Object>} The created refresh token object or an error.
 */
refreshTokenService.createRefreshToken = async ({refreshToken, userId}) => {
    try {
        const userRefreshToken = await RefreshToken.create({
            refreshToken: refreshToken,
            userId: userId
        });

        return userRefreshToken;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves a refresh token entry from the database based on the token and user ID.
 *
 * @async
 * @function getRefreshToken
 * @param {Object} params - The parameters for retrieving a refresh token.
 * @param {string} params.refreshToken - The refresh token string to search for.
 * @param {number} params.userId - The ID of the user associated with the refresh token.
 * @returns {Promise<Object|null>} The refresh token object if found, or null if not found, or an error.
 */
refreshTokenService.getRefreshToken = async ({refreshToken, userId}) => {
    try {
        const userRefreshToken = await RefreshToken.findOne({
            where: {
                refreshToken: refreshToken,
                userId: userId
            }
        });
        return userRefreshToken;
    } catch (error) {
        throw error;
    }
}

/**
 * Deletes a refresh token entry from the database by its ID.
 *
 * @async
 * @function deleteRefreshToken
 * @param {number} id - The ID of the refresh token to delete.
 * @returns {Promise<Object|null>} The deleted refresh token object if found and deleted, or null if not found, or an error.
 */
refreshTokenService.deleteRefreshToken = async (id) => {
    try {
        const userRefreshToken = await RefreshToken.findByPk(id);
        if (userRefreshToken) {
            const userRefreshTokenToBeDeleted = userRefreshToken.get({plain: true});
            await userRefreshToken.destroy(); // Ensure to await the destruction
            return userRefreshTokenToBeDeleted;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

/**
 * Deletes all refresh token entries associated with a user from the database.
 *
 * @async
 * @function deleteRefreshTokenForUser
 * @param {number} userId - The ID of the user whose refresh tokens should be deleted.
 * @returns {Promise<void>} Resolves with no value or an error if the operation fails.
 */
refreshTokenService.deleteRefreshTokenForUser = async (userId) => {
    try {
        await RefreshToken.destroy({where: {userId: userId}});
    } catch (error) {
        throw error;
    }
}

module.exports = refreshTokenService;
