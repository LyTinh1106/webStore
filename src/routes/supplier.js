const express = require('express');
const {
  createSupplier,
  getSupplierById,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier
} = require('../controllers/SupplierController');

const router = express.Router();

router.post('/create', createSupplier); // Tạo mới nhà cung cấp
router.get('/', getAllSuppliers); // Lấy tất cả nhà cung cấp
router.get('/:id', getSupplierById); // Lấy nhà cung cấp theo ID
router.put('/:id', updateSupplier); // Cập nhật nhà cung cấp
router.delete('/delete/:id', deleteSupplier); // Xoá nhà cung cấp

module.exports = router;
