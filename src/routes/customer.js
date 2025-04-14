const express = require('express');
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} = require('../controllers/CustomerController');

const router = express.Router();

router.get('/', getAllCustomers);       // GET /customer?search=...
router.get('/:id', getCustomerById);   // GET by ID
router.post('/', createCustomer);       // POST
router.put('/:id', updateCustomer);    // PUT
router.delete('/:id', deleteCustomer); // DELETE

module.exports = router;
