const express = require('express')
const router = express.Router();
const productControllers = require('./../controllers/productControllers')
const authControllers = require('./../controllers/authControllers')

router.route('/getProducts').get(productControllers.getProducts).post(authControllers.secure, authControllers.adminAuthMiddleware, productControllers.postProduct);
router.route('/getProduct/:id').get(productControllers.getIdProduct)
.patch(authControllers.secure,authControllers.adminAuthMiddleware, productControllers.updateProduct).delete( authControllers.secure, authControllers.adminAuthMiddleware, productControllers.deleteProduct)
router.route('/search').get(productControllers.searchProducts);
module.exports = router;