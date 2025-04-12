const express = require('express')
// const {getHomePage} = require('../Controllers/HomeController')
const {getRegister,getHomePage,getLogin, postRegister,postLogin, getDashboard} = require('../controllers/AccountController')
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
router.get('/dashboard', checkAdmin, getDashboard);

router.post('/register', postRegister)
router.post('/login',postLogin)

  module.exports = router