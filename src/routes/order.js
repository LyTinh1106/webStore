const express = require('express');
const {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  updateStatus,
  deleteOrder,
  getRevenue,
  getProductQuantity,
  getYear,
  getBasicOnDeliveringOrders,
  getOrderDetailsById
} = require('../controllers/OrderController');

const router = express.Router();
router.get('/basic-on-delivering', getBasicOnDeliveringOrders);
router.get('/details/:id', getOrderDetailsById);


router.post('/create', createOrder);          // Tạo đơn hàng
router.get('/order/:id', getOrderById);      // Lấy theo ID
router.get('/', getAllOrders);          // Lấy tất cả đơn hàng
router.get('/revenue/:year',getRevenue);
router.get('/productQuantity/:year',getProductQuantity);
router.get('/year',getYear);
router.put('/:id', updateOrder);  
router.put('/status/:id', updateStatus);     // Cập nhật đơn hàng
router.delete('/:id', deleteOrder);    // Xoá đơn hàng
module.exports = router;
