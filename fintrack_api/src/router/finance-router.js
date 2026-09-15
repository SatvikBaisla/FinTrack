const express = require('express');
const router = express.Router();

const financeController = require('../controller/finance-contoller');

router.get('/subscription', financeController.getAllUsersSubscription);
router.post('/subscription', financeController.addNewSubscription);
router.get('/debts', financeController.getAllDebts);
router.post('/debts', financeController.addNewDebt);

module.exports = router;