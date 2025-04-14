const express = require('express');
const {
  createVoucher,
  getVoucherById,
  getAllVouchers,
  updateVoucher,
  deleteVoucher
} = require('../controllers/VoucherController');

const router = express.Router();

router.post('/', createVoucher); // Tạo mới voucher
router.get('/', getAllVouchers); // Lấy tất cả voucher (có thể lọc theo voucher_code)
router.get('/:id', getVoucherById); // Lấy voucher theo ID
router.put('/:id', updateVoucher); // Cập nhật voucher
router.delete('/:id', deleteVoucher); // Xoá voucher

module.exports = router;
