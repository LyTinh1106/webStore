const express = require('express');
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
  getLogin
} = require('../controllers/AccountController');

const router = express.Router();

// Giao diện
router.get('/homepage', getHomePage);
router.get('/register', getRegister);
router.get('/login', getLogin);
router.get('/dashboard', getDashboard);

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
