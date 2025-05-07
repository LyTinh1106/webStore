const express = require('express');
const {
  createVoucher,
  getVoucherById,
  getAllVouchers,
  updateVoucher,
  deleteVoucher,
  applyVoucher
} = require('../controllers/VoucherController');

const router = express.Router();

router.post('/create', createVoucher); // Tạo mới voucher
router.get('/', getAllVouchers); // Lấy tất cả voucher (có thể lọc theo voucher_code)
router.get('/:id', getVoucherById); // Lấy voucher theo ID
router.put('/update/:id', updateVoucher); // Cập nhật voucher
router.delete('/delete/:id', deleteVoucher); // Xoá voucher
router.post('/apply',applyVoucher);
module.exports = router;
