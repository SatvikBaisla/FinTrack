const express = require('express');
const router = express.Router();

const financeController = require('../controller/finance-contoller');
const authMiddleware = require('../middleware/auth-middleware');

router.get('/subscription', authMiddleware, financeController.getAllUsersSubscription);
router.post('/subscription', authMiddleware, financeController.addNewSubscription);
router.get('/debts', authMiddleware, financeController.getAllDebts);
router.post('/debts', authMiddleware, financeController.addNewDebt);
router.get('/savings', authMiddleware, financeController.getAllSavings);
router.post('/savings', authMiddleware, financeController.addNewSaving);
router.put('/funds', authMiddleware, financeController.updateFund);

module.exports = router;