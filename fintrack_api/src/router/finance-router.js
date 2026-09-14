const express = require('express');
const router = express.Router();

const financeController = require('../controller/finance-contoller');

router.get('/subscription', financeController.getAllUsersSubscription);
router.post('/subscription', financeController.addNewSubscription);

module.exports = router;