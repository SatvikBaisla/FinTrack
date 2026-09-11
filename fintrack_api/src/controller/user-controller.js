const userService = require('../service/user-service');

const getAllUserAccounts = async (req, res) => {
    const userId = 2;
    try{
        const allAccounts = await userService.getAllUserAccounts(userId);
        if(!allAccounts){
            return res.status(404).json({
                success: false,
                message: 'no account found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'all user accounts',
            data: allAccounts
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// request body -> name, type, opening_balance, current_balance
const addNewAccount = async (req, res) => {
    const userId = 2;
    const {name, type, opening_balance, current_balance} = req.body;
    try{
        const newAccount = await userService.addNewAccount(name, type, opening_balance, current_balance, userId);
        if(!newAccount){
            return res.status(404).json({
                success: false,
                message: 'fail to add account'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'account added successfully',
            data: newAccount
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// request body -> name, type, opening_balance, current_balance
const editAccount = async (req, res) => {
    try{
        const accountId = req.params.accountId;
        const { name, type, opening_balance, current_balance } = req.body;

        const updatedAccount = await userService.editAccount(accountId, name, type, opening_balance, current_balance);
        if(!updatedAccount){
            return res.status(404).json({
                success: false,
                message: 'fail to updated account'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'account updated successfully',
            data: updatedAccount
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteAccount = async (req, res) => {
    try{
        const accountId = req.params.accountId;

        const account = await userService.deleteAccount(accountId);
        if(!account){
            return res.status(404).json({
                success: false,
                message: 'fail to delete account'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'account deleted successfully',
            data: account
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    getAllUserAccounts,
    addNewAccount,
    editAccount,
    deleteAccount
}