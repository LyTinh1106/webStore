const express = require('express');
const {
  createOrderAndSendEmail,
  getOrderById,
  getAllOrders,
  updateOrder,
  updateStatus,
  deleteOrder,
  getRevenueByYear,
  getRevenueByMonth,  
  getRevenueByQuarters,
  getRevenueByDateRange,
  getProductQuantityByYear,
  getProductQuantityByQuarters,
  getProductQuantityByMonth,
  getProductQuantityByDateRange,
  getYear,
  getBasicOnDeliveringOrders,
  getOrderDetailsById
} = require('../controllers/OrderController');

const router = express.Router();
router.get('/basic-on-delivering', getBasicOnDeliveringOrders);
router.get('/details/:id', getOrderDetailsById);

router.post('/create', createOrderAndSendEmail);          // Tạo đơn hàng và có gửi thông báo đơn hàng
router.get('/order/:id', getOrderById);      // Lấy theo ID
router.get('/', getAllOrders);          // Lấy tất cả đơn hàng
router.get('/revenue/year/:year',getRevenueByYear);
router.get('/revenue/month/:year/:month', getRevenueByMonth);
router.get('/revenue/quarter/:year', getRevenueByQuarters);
router.get('/revenue/dateRange/:dateStart/:dateEnd', getRevenueByDateRange);
router.get('/productQuantity/year/:year',getProductQuantityByYear);
router.get('/productQuantity/quarter/:year', getProductQuantityByQuarters);
router.get('/productQuantity/month/:year/:month', getProductQuantityByMonth);
router.get('/productQuantity/dateRange/:dateStart/:dateEnd', getProductQuantityByDateRange);
router.get('/year',getYear);
router.put('/:id', updateOrder);  
router.put('/status/:id', updateStatus);     // Cập nhật đơn hàng
router.delete('/:id', deleteOrder);    // Xoá đơn hàng
module.exports = router;
