const express = require('express')
// const {getHomePage} = require('../Controllers/HomeController')
const {getRegister,getHomePage,getLogin, getDashboard, register, login} = require('../controllers/AccountController')
const {getCheckout} = require('../controllers/CheckoutController')
const {getProduct, getStore} = require('../controllers/ProductController')
const { checkAdmin } = require('../middleware/authMiddleware');
const router = express.Router()


router.get('/',getHomePage)
router.get('/register', getRegister)
router.get('/homepage', getHomePage)
router.get('/login', getLogin)
router.get('/checkout',getCheckout)
router.get('/product',getProduct)
router.get('/store',getStore)
router.get('/dashboard', getDashboard);

router.post('/register', register)
router.post('/login',login)


  module.exports = router