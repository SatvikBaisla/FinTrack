const express = require('express');
const router = express.Router();

const userController = require('../controller/user-controller');

const authMiddleware = require('../middleware/auth-middleware');

router.get('/accounts', authMiddleware, userController.getAllUserAccounts);
router.post('/accounts', authMiddleware, userController.addNewAccount);
router.put('/accounts/:accountId', authMiddleware, userController.editAccount);
router.delete('/accounts/:accountId', authMiddleware, userController.deleteAccount);
router.get('/cards', authMiddleware, userController.getAllCards);
router.post('/cards', authMiddleware, userController.addNewCard);

module.exports = router;