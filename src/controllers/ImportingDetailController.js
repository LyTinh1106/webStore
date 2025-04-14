const ImportingDetail = require('../models/ImportingDetailModel');

// Thêm dòng chi tiết nhập hàng
const createImportingDetail = (req, res) => {
  const { id_importing, id_product, quantity, subtotalprice } = req.body;

  if (!id_importing || !id_product || !quantity || !subtotalprice) {
    return res.status(400).json({ message: "Thiếu thông tin chi tiết nhập hàng." });
  }

  const newDetail = new ImportingDetail({ id_importing, id_product, quantity, subtotalprice });

  ImportingDetail.create(newDetail, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi tạo chi tiết nhập hàng." });
    res.status(201).json({ message: "Tạo chi tiết nhập hàng thành công", data });
  });
};

// Lấy chi tiết nhập hàng theo id_importing
const getImportingDetailsByImportingId = (req, res) => {
  const importingId = req.params.id;

  ImportingDetail.findByImportingId(importingId, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi lấy chi tiết nhập hàng." });
    if (!data || data.length === 0) return res.status(404).json({ message: "Không có chi tiết nhập hàng nào." });
    res.status(200).json(data);
  });
};

// Cập nhật chi tiết nhập hàng
const updateImportingDetail = (req, res) => {
  const importingId = req.params.importingId;
  const productId = req.params.productId;
  const { quantity, subtotalprice } = req.body;

  if (!quantity || !subtotalprice) {
    return res.status(400).json({ message: "Thiếu thông tin cập nhật." });
  }

  const updatedDetail = { quantity, subtotalprice };

  ImportingDetail.update(importingId, productId, updatedDetail, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi cập nhật chi tiết nhập hàng." });
    if (!data) return res.status(404).json({ message: "Chi tiết nhập hàng không tồn tại." });
    res.status(200).json({ message: "Cập nhật chi tiết nhập hàng thành công", data });
  });
};

// Xoá chi tiết nhập hàng
const deleteImportingDetail = (req, res) => {
  const importingId = req.params.importingId;
  const productId = req.params.productId;

  ImportingDetail.remove(importingId, productId, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi xoá chi tiết nhập hàng." });
    if (!data) return res.status(404).json({ message: "Chi tiết nhập hàng không tồn tại." });
    res.status(200).json({ message: "Xoá chi tiết nhập hàng thành công" });
  });
};

module.exports = {
  createImportingDetail,
  getImportingDetailsByImportingId,
  updateImportingDetail,
  deleteImportingDetail
};
