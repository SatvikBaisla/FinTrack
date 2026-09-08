const express = require('express');
const router = express.Router();

const authController = require('../controller/auth-controller');

router.get('/', authController.getAllUsers);
router.post('/register', authController.registerNewUser);
router.post('/login', authController.loginUser);

module.exports = router;