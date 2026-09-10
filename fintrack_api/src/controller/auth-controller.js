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
                message: "invalid email address"
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
        const accessToken = jwt.sign(
            { userId: user.user_id },
            process.env.AT_SALT,
            { expiresIn: '15m' }
        )

        // refresh token
        const refreshToken = jwt.sign(
            { userId: user.user_id },
            process.env.RT_SALT,
            { expiresIn: '7d' }
        )

        // store hashed refresh token in db
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await authService.storeRefreshToken(user.user_id, hashedRefreshToken);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,       // true in production with HTTPS
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const { password_hash, ...userDetails } = user;

        // login response
        return res.status(200).json({
            success: true,
            message: 'user login successfull',
            data: userDetails,
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

const refreshToken = async (req, res) => {
    try {
        // get refresh token from cookies 
        const refreshToken = req.cookies.refreshToken;

        // if no refreshtoken
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'refresh token required'
            })
        }

        // now decode and get the userId
        const decodedToken = jwt.verify(
            refreshToken,
            process.env.RT_SALT
        )

        // get all tokens of the user 
        const tokens = await authService.findRefreshToken(decodedToken.userId);

        // loop through and find the token needed
        let matchedToken;
        for (let i = 0; i < tokens.length; i++) {
            const compare = await bcrypt.compare(
                refreshToken,
                tokens[i].token
            )
            if (compare) {
                matchedToken = tokens[i].token;
                break;
            }
        }

        // if no token found
        if (!matchedToken) {
            return res.status(401).json({
                success: false,
                message: 'refresh token is expired or revoked'
            })
        }

        // token found create new access token 
        const newAccessToken = jwt.sign(
            { userId: decodedToken.userId },
            process.env.AT_SALT,
            { expiresIn: '15m' }
        )

        return res.status(200).json({
            success: true,
            message: 'access token refreshed',
            token: newAccessToken
        })
    }
    catch (error) {
        if (
            error.name === 'TokenExpiredError' ||
            error.name === 'JsonWebTokenError'
        ) {
            return res.status(401).json({
                success: false,
                message: 'invalid or expired refresh token'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
}

const logoutUser = async (req, res) => {
    try {
        // get refresh token from cookies 
        const refreshToken = req.cookies.refreshToken;

        // if no refreshtoken
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'allready logged out'
            })
        }

        // now decode and get the userId
        const decodedToken = jwt.verify(
            refreshToken,
            process.env.RT_SALT
        )

        // get all tokens of the user 
        const tokens = await authService.findRefreshToken(decodedToken.userId);

        // loop through and find the token needed
        let matchedTokenId;
        for (let i = 0; i < tokens.length; i++) {
            const compare = await bcrypt.compare(
                refreshToken,
                tokens[i].token
            )
            if (compare) {
                matchedTokenId = tokens[i].token_id;
                break;
            }
        }

        // if no token found
        if (!matchedTokenId) {
            return res.status(401).json({
                success: false,
                message: 'allready logged out'
            })
        }

        // remove refresh token cookie
        req.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });

        // update the the revoked_at column in db
        await authService.updateRefreshToken(matchedTokenId);

        return res.status(200).json({
            success: true,
            message: 'user have been logged out'
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
    loginUser,
    refreshToken,
    logoutUser
}