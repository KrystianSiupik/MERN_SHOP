const express = require('express');
const userController = require('./../controllers/userControllers');
const router = express.Router();
const authControllers = require('./../controllers/authControllers')
router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/adminDashboard', authControllers.secure, authControllers.adminAuthMiddleware, userController.adminDashboard);

module.exports = router;