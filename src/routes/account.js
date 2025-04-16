const express = require('express');
require('dotenv').config(); 
const bodyParser = require('body-parser');
const {
  create,
  findAll,
  findOne,
  findByEmail,
  update,
  remove,
  isAdmin,
  register,
  login,
  getDashboard,
  getHomePage,
  getRegister,
  getLogin,
  getForgotPassword,
  getResetPassword,
  sendResetPasswordEmail,
  resetPassword,
  verifyResetToken
 
  
 
} = require('../controllers/AccountController');

const router = express.Router();

// Giao diện
router.get('/homepage', getHomePage);
router.get('/register', getRegister);
router.get('/login', getLogin);
router.get('/dashboard', getDashboard);

//Quên Mật Khẩu
router.get("/forgot-password", getForgotPassword);
router.get("/reset-password" , getResetPassword);
router.get('/reset-password', verifyResetToken);

// Xử lý quên mật khẩu
router.post('/forgot-password', sendResetPasswordEmail);
router.post('/reset-password/:token', resetPassword);
router.post('/send-reset-code',sendResetPasswordEmail);
router.post('/send-reset-code/:token', resetPassword)


// Xử lý auth
router.post('/register', register);
router.post('/login', login);


// API
router.get('/', findAll);                    // GET /accounts
router.get('/email/:email', findByEmail);   // GET /accounts/email/:email
router.get('/isAdmin/:email', isAdmin);     // GET /accounts/isAdmin/:email
router.get('/:id', findOne);                // GET /accounts/:id
router.post('/', create);                   // POST /accounts
router.put('/:id', update);                 // PUT /accounts/:id
router.delete('/:id', remove);              // DELETE /accounts/:id

module.exports = router;
