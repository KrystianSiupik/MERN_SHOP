const express = require('express');
const cartController = require('./../controllers/cartController')
const authControllers = require('./../controllers/authControllers')
const router = express.Router();

router.route('/addItem').post(authControllers.secure, cartController.addItemToCart);
router.route('/removeItem/:itemId').delete(authControllers.secure, cartController.removeItemFromCart);
router.route('/getCart').get(authControllers.secure, cartController.getCart);

module.exports = router;