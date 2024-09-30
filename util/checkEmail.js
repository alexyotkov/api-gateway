/**
 * Checks if the provided email address is valid based on a regular expression.
 *
 * @function checkEmail
 * @param {string} email - The email address to validate.
 * @returns {boolean} Returns true if the email is valid; otherwise, false.
 */
const checkEmail = (email) => {
    const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

module.exports = checkEmail;