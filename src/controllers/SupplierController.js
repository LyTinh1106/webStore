const Supplier = require('../models/SupplierModel');

// Thêm nhà cung cấp mới
const createSupplier = (req, res) => {
  const { name, phonenumber, email, address } = req.body;

  if (!name || !phonenumber || !email || !address) {
    return res.status(400).json({ message: "Thiếu thông tin nhà cung cấp." });
  }

  const newSupplier = new Supplier({ name, phonenumber, email, address });

  Supplier.create(newSupplier, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi tạo nhà cung cấp." });
    res.status(201).json({ message: "Tạo nhà cung cấp thành công", data });
  });
};

// Lấy nhà cung cấp theo ID
const getSupplierById = (req, res) => {
  const supplierId = req.params.id;

  Supplier.findById(supplierId, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi lấy nhà cung cấp." });
    if (!data) return res.status(404).json({ message: "Nhà cung cấp không tồn tại." });
    res.status(200).json(data);
  });
};

// Lấy tất cả nhà cung cấp
const getAllSuppliers = (req, res) => {
  Supplier.getAll((err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi lấy danh sách nhà cung cấp." });
    res.status(200).json(data);
  });
};

// Cập nhật nhà cung cấp
const updateSupplier = (req, res) => {
  const supplierId = req.params.id;
  const { name, phonenumber, email, address } = req.body;

  if (!name || !phonenumber || !email || !address) {
    return res.status(400).json({ message: "Thiếu thông tin cập nhật." });
  }

  const updatedSupplier = { name, phonenumber, email, address };

  Supplier.updateById(supplierId, updatedSupplier, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi cập nhật nhà cung cấp." });
    if (!data) return res.status(404).json({ message: "Nhà cung cấp không tồn tại." });
    res.status(200).json({ message: "Cập nhật nhà cung cấp thành công", data });
  });
};

// Xoá nhà cung cấp
const deleteSupplier = (req, res) => {
  const supplierId = req.params.id;

  Supplier.remove(supplierId, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi xoá nhà cung cấp." });
    if (!data) return res.status(404).json({ message: "Nhà cung cấp không tồn tại." });
    res.status(200).json({ message: "Xoá nhà cung cấp thành công" });
  });
};

module.exports = {
  createSupplier,
  getSupplierById,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier
};
