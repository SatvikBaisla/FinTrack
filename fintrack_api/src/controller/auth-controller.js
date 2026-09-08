const authService = require('../service/auth-service');

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

module.exports = {
    getAllUsers
}