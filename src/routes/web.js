const express = require('express')
require('dotenv').config(); 

// const {getHomePage} = require('../Controllers/HomeController')
const {getRegister,getHomePage,getLogin, getDashboard, register, login, getForgotPassword, getResetPassword, forgotPassword, handleForgotPassword, handleResetPassword, resetPassword, verifyResetToken} = require('../controllers/AccountController')
const {getCheckout} = require('../controllers/CheckoutController')
const {getProduct, getStore} = require('../controllers/ProductController')
const { checkAdmin } = require('../middleware/authMiddleware');
const { sendResetPasswordEmail} = require('../controllers/AccountController');
const router = express.Router()


router.get('/',getHomePage)
router.get('/register', getRegister)
router.get('/homepage', getHomePage)
router.get('/login', getLogin)
router.get('/checkout',getCheckout)
router.get('/product',getProduct)
router.get('/store',getStore)
router.get('/dashboard', getDashboard);
router.get('/forgot-password',getForgotPassword);
router.get('/reset-password',getResetPassword);
router.get('/reset-password',verifyResetToken);

router.post('/register', register)
router.post('/login',login)

router.post('/forgot-password',sendResetPasswordEmail);
router.post('/reset-password',resetPassword);
router.post('/send-reset-code', sendResetPasswordEmail)
router.post('/send-reset-code/:token', resetPassword);
router.post('/reset-password/:token', resetPassword);




  module.exports = router