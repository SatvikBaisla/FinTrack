const authService = require('../service/auth-service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    try {
        const allusers = await authService.getAllUsers();
        return res.status(200).json({
            success: true,
            message: 'all users found',
            data: allusers
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// req body -> name, email, password
const registerNewUser = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password; //qwerty123

        // all fields required 
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'invaild values'
            })
        }

        // verify the email 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address"
            });
        }

        // check if the email already exist
        const emailCheck = await authService.emailCheck(email);
        if (emailCheck) {
            return res.status(409).json({
                success: false,
                message: "email address already exist"
            });
        }

        // check password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "password should have atleast 8 chars"
            });
        }

        // hashing passowrd 
        const password_hash = await bcrypt.hash(password, 10);

        // create new user row
        const newUser = await authService.registerNewUser(name, email, password_hash);
        if (newUser) {
            return res.status(201).json({
                success: true,
                message: "user added successfully",
                data: newUser
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// req body -> email, password
const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // verify the email 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address"
            });
        }

        const user = await authService.searchUserByEmail(email);

        // if no user exist with the email
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'no user found'
            })
        }

        // compare the password
        const passCompare = await bcrypt.compare(
            password,
            user.password_hash
        )
        if (!passCompare) {
            return res.status(401).json({
                success: false,
                message: 'wrong password'
            })
        }

        // create tokens for login
        // access token
        const accessToken = await jwt.sign(
            { userId: user.user_id },
            process.env.AT_SALT,
            { expiresIn: '15m' }
        )

        // refresh token
        const refreshToken = await jwt.sign(
            { userId: user.user_id },
            process.env.RT_SALT,
            { expiresIn: '7d' }
        )

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,       // true in production with HTTPS
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // login response
        return res.status(200).json({
            success: true,
            message: 'user found',
            accessToken: accessToken
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    getAllUsers,
    registerNewUser,
    loginUser
}