const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');
const ProductController = require('../controllers/ProductController');
const CheckoutController = require('../controllers/CheckoutController');

// Tài khoản
router.post('/register', AccountController.register);
router.post('/login', AccountController.login);

// Sản phẩm
router.get('/product', ProductController.getProduct);
router.get('/store', ProductController.getStore);

// Thanh toán
router.get('/checkout', CheckoutController.getCheckout); // hoặc POST tùy logic

module.exports = router;
