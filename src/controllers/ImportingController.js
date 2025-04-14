const Importing = require('../models/ImportingModel');

// Tạo phiếu nhập mới
const createImporting = (req, res) => {
  const { date, total_price, id_supplier } = req.body;

  if (!date || !total_price || !id_supplier) {
    return res.status(400).json({ message: "Thiếu thông tin phiếu nhập." });
  }

  const newImporting = new Importing({ date, total_price, id_supplier });

  Importing.create(newImporting, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi tạo phiếu nhập." });
    res.status(201).json({ message: "Tạo phiếu nhập thành công", data });
  });
};

// Lấy phiếu nhập theo ID
const getImportingById = (req, res) => {
  const importingId = req.params.id;

  Importing.findById(importingId, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi lấy phiếu nhập." });
    if (!data) return res.status(404).json({ message: "Phiếu nhập không tồn tại." });
    res.status(200).json(data);
  });
};

// Lấy tất cả phiếu nhập (có thể lọc theo nhà cung cấp)
const getAllImportings = (req, res) => {
  const supplierId = req.query.supplierId;

  Importing.getAll(supplierId, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi lấy danh sách phiếu nhập." });
    res.status(200).json(data);
  });
};

// Cập nhật phiếu nhập
const updateImporting = (req, res) => {
  const importingId = req.params.id;
  const { date, total_price, id_supplier } = req.body;

  if (!date || !total_price || !id_supplier) {
    return res.status(400).json({ message: "Thiếu thông tin cập nhật." });
  }

  const updatedImporting = { date, total_price, id_supplier };

  Importing.updateById(importingId, updatedImporting, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi cập nhật phiếu nhập." });
    if (!data) return res.status(404).json({ message: "Phiếu nhập không tồn tại." });
    res.status(200).json({ message: "Cập nhật phiếu nhập thành công", data });
  });
};

// Xoá phiếu nhập
const deleteImporting = (req, res) => {
  const importingId = req.params.id;

  Importing.remove(importingId, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi xoá phiếu nhập." });
    if (!data) return res.status(404).json({ message: "Phiếu nhập không tồn tại." });
    res.status(200).json({ message: "Xoá phiếu nhập thành công" });
  });
};

module.exports = {
  createImporting,
  getImportingById,
  getAllImportings,
  updateImporting,
  deleteImporting
};
