const db = require('../models');
const User = db['User'];
const userService = {};

userService.createUser = async ({username, email, password, role}) => {
    try {
        const user = await User.create({
            username: username,
            email: email,
            password: password,
            role: role
        });
        return user;
    }
    catch (error) {
        return error;
    }
}

userService.getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({where: {email: email}});
        return user;
    }
    catch (error) {
        return error;
    }
}

userService.getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user;
    }
    catch (error) {
        return error;
    }
}

module.exports = userService;

