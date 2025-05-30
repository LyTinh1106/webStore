const express = require('express')
require('dotenv').config();

// const {getHomePage} = require('../Controllers/HomeController')
const { getRegister, getHomePage, getLogin, getDashboard, register, login, getForgotPassword, getResetPassword, forgotPassword, handleForgotPassword, handleResetPassword, resetPassword, verifyResetToken, verifyOtp, getInfo, getLastViewProducts } = require('../controllers/AccountController')
const { getCheckout, getCart } = require('../controllers/CheckoutController')
const { getProduct, getStore } = require('../controllers/ProductController')
const { checkAdmin,checkLogin} = require('../middleware/authMiddleware');
const { sendResetPasswordEmail,getSuccess } = require('../controllers/AccountController');
const { searchProductRender, compareProducts } = require('../controllers/ProductController');
const router = express.Router()


router.get('/', getHomePage);
router.get('/register', getRegister);
router.get('/homepage', getHomePage);
router.get('/login', getLogin);
router.get('/checkout',checkLogin, getCheckout);
router.get('/product/:id', getProduct);
router.get('/store', searchProductRender);
router.get('/store/all', getStore);
router.get('/dashboard', getDashboard);
router.get('/forgot-password', getForgotPassword);
router.get('/reset-password', getResetPassword);
router.get('/reset-password', verifyResetToken);
router.get('/verify-otp', (req, res) => res.render('verify-otp', { message: null }));
router.get('/cart', getCart);
router.get('/userInfo', getInfo);
router.get('/lastViewProducts', getLastViewProducts);

router.post('/verify-otp', verifyOtp);
router.post('/register', register)
router.post('/verify-otp', verifyOtp);
router.post('/login', login)


router.get('/success',getSuccess)

router.post('/forgot-password', sendResetPasswordEmail);
router.post('/reset-password', resetPassword);
router.post('/send-reset-code', sendResetPasswordEmail)
router.post('/send-reset-code/:token', resetPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/compare/:id1/:id2', compareProducts);

module.exports = router