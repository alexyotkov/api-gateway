const userService = require('../services/user.service');
const checkEmail = require('../util/checkEmail');
const checkPassword = require('../util/checkPassword');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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

        const accessToken = jwt.sign({userId: user.id}, process.env.ACCESS_TOKEN_SECRET, {subject: 'accessApi', expiresIn: '1h'});

        res.status(200).json({
            userId: user.id,
            username: user.username,
            email: user.email,
            accessToken: accessToken
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = userController;