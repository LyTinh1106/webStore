const express = require('express');
const {
  createShipping,
  getShippingById,
  getAllShipping,
  updateShippingById,
  deleteShippingById
} = require('../controllers/ShippingController');

const router = express.Router();

router.post('/create', createShipping); // Thêm thông tin vận chuyển mới
router.get('/:id', getShippingById); // Lấy thông tin vận chuyển theo id
router.get('/', getAllShipping); // Lấy tất cả vận chuyển
router.put('/:id', updateShippingById); // Cập nhật thông tin vận chuyển theo id
router.delete('/:id', deleteShippingById); // Xoá vận chuyển theo id

module.exports = router;
