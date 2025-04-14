const express = require('express');
const {
  createImporting,
  getImportingById,
  getAllImportings,
  updateImporting,
  deleteImporting
} = require('../controllers/ImportingController');

const router = express.Router();

router.post('/', createImporting); // Tạo phiếu nhập mới
router.get('/', getAllImportings); // Lấy tất cả phiếu nhập (có thể lọc theo nhà cung cấp)
router.get('/:id', getImportingById); // Lấy phiếu nhập theo ID
router.put('/:id', updateImporting); // Cập nhật phiếu nhập
router.delete('/:id', deleteImporting); // Xoá phiếu nhập

module.exports = router;
