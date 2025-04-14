const express = require('express');
const {
  createImportingDetail,
  getImportingDetailsByImportingId,
  updateImportingDetail,
  deleteImportingDetail
} = require('../controllers/ImportingDetailController');

const router = express.Router();

router.post('/', createImportingDetail); // Thêm chi tiết nhập hàng mới
router.get('/:id', getImportingDetailsByImportingId); // Lấy chi tiết nhập hàng theo id_importing
router.put('/:importingId/:productId', updateImportingDetail); // Cập nhật chi tiết nhập hàng
router.delete('/:importingId/:productId', deleteImportingDetail); // Xoá chi tiết nhập hàng

module.exports = router;
