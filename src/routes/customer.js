const express = require('express');
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  checkMailById,
} = require('../controllers/CustomerController');

const router = express.Router();

router.get('/', getAllCustomers);       // GET /customer?search=...
router.get('/:id', getCustomerById);   // GET by ID
router.get('/check/:email', checkMailById);   // GET by ID
router.post('/create', createCustomer);       // POST
router.put('/update/:id', updateCustomer);    // PUT
router.delete('/delete/:id', deleteCustomer); // DELETE

module.exports = router;
