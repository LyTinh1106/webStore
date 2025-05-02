const express = require('express');
const {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/OrderController');

const router = express.Router();

router.post('/create', createOrder);          // Tạo đơn hàng
router.get('/:id', getOrderById);      // Lấy theo ID
router.get('/', getAllOrders);          // Lấy tất cả đơn hàng
router.put('/:id', updateOrder);       // Cập nhật đơn hàng
router.delete('/:id', deleteOrder);    // Xoá đơn hàng

module.exports = router;
