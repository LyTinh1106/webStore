const express = require('express');
const { getCheckout, getCart, createMomoPayment } = require('../controllers/CheckoutController');
const router = express.Router();


router.get('/payment/momo', createMomoPayment); 

module.exports = router;
