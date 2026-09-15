const financeService = require('../service/finance-service');

const getAllUsersSubscription = async (req, res) => {
    try {
        const userId = 2;
        const subscriptions = await financeService.getAllUsersSubscription(userId);
        return res.status(200).json({
            success: true,
            message: 'users all subscriptions',
            data: subscriptions
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// req body -> name, sub_amount, sub_date, start_date, end_date
const addNewSubscription = async (req, res) => {
    try {
        const userId = 2;
        const subscriptionDetails = req.body;

        const newSubscription = await financeService.addNewSubscription(userId, subscriptionDetails);

        if (!newSubscription) {
            return res.status(404).json({
                success: false,
                message: 'fail to create new subscription'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'subscription created successfully',
            data: newSubscription
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getAllDebts = async (req, res) => {
    try {
        const userId = 2;
        const debts = await financeService.getAllDebts(userId);
        return res.status(200).json({
            success: true,
            message: 'users all debts',
            data: debts
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// req body -> person_name, type, amount, date, end_date
const addNewDebt = async (req, res) => {
    try {
        const userId = 2;
        const debtDetails = req.body;
        const newDebt = await financeService.addNewDebt(userId, debtDetails);
        if (!newDebt) {
            return res.status(404).json({
                success: false,
                message: 'no debt found',
                data: newDebt
            })
        }
        return res.status(200).json({
            success: true,
            message: 'new debt create successfully',
            data: newDebt
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getAllUsersSubscription,
    addNewSubscription,
    getAllDebts,
    addNewDebt
}