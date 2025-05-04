const express = require('express');
const {
  createOrderDetail,
  getDetailsByOrderId,
  getAllOrderDetails,
  updateOrderDetail,
  deleteOrderDetail
} = require('../controllers/OrderDetailController');

const router = express.Router();

router.post('/', createOrderDetail); // Tạo mới
router.get('/', getAllOrderDetails); // Lấy tất cả
router.get('/:orderId', getDetailsByOrderId); 
router.put('/:orderId/:productId', updateOrderDetail); // Cập nhật
router.delete('/:orderId/:productId', deleteOrderDetail); // Xoá

module.exports = router;
