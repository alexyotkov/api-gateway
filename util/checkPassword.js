/**
 * Checks if the provided password meets the complexity requirements.
 * The password must:
 * - Be at least 8 characters long.
 * - Contain at least one lowercase letter.
 * - Contain at least one uppercase letter.
 * - Contain at least one digit.
 * - Contain at least one special character (_@$!%*?&).
 *
 * @function checkPassword
 * @param {string} password - The password to validate.
 * @returns {boolean} Returns true if the password is valid; otherwise, false.
 */
const checkPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

module.exports = checkPassword;