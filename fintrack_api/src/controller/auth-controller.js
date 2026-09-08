const authService = require('../service/auth-service');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const allusers = await authService.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'all users found',
            data: allusers
        })
    }
    catch (error) {
        res.status(404).json({
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
            res.status(400).json({
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
        if(emailCheck){
            return res.status(400).json({
                success: false,
                message: "email address already exist"
            });
        }

        // check password length
        if (password.length < 8){
            return res.status(400).json({
                success: false,
                message: "password should have atleast 8 chars"
            });
        }

        // hashing passowrd 
        const password_hash = await bcrypt.hash(password, 10);

        // create new user row
        const newUser = await authService.registerNewUser(name, email, password_hash);
        if(newUser){
            return res.status(200).json({
                success: true,
                message: "user added successfully",
                data: newUser
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    getAllUsers,
    registerNewUser
}