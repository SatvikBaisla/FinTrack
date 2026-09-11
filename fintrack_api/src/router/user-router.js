const express = require('express');
const router = express.Router();

const userController = require('../controller/user-controller');

router.get('/accounts', userController.getAllUserAccounts);
router.post('/accounts', userController.addNewAccount);
router.put('/accounts/:accountId', userController.editAccount);
router.delete('/accounts/:accountId', userController.deleteAccount);

module.exports = router;