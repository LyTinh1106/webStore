const express = require('express');
const {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
} = require('../controllers/CustomerController');

const router = express.Router();

router.post('/', createCustomer);            // Tạo customer
router.get('/:id', getCustomerById);        // Lấy theo ID
router.get('/', getAllCustomers);            // Lấy tất cả / tìm kiếm
router.put('/:id', updateCustomer);         // Cập nhật
router.delete('/:id', deleteCustomer);      // Xoá

module.exports = router;
