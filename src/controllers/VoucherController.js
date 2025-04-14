const Voucher = require('../models/VoucherModel');

// Thêm voucher mới
const createVoucher = (req, res) => {
  const { voucher_code, voucher_value, date_start, date_end } = req.body;

  if (!voucher_code || !voucher_value || !date_start || !date_end) {
    return res.status(400).json({ message: "Thiếu thông tin voucher." });
  }

  const newVoucher = new Voucher({ voucher_code, voucher_value, date_start, date_end });

  Voucher.create(newVoucher, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi tạo voucher." });
    res.status(201).json({ message: "Tạo voucher thành công", data });
  });
};

// Lấy voucher theo ID
const getVoucherById = (req, res) => {
  const voucherId = req.params.id;

  Voucher.findById(voucherId, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi lấy voucher." });
    if (!data) return res.status(404).json({ message: "Voucher không tồn tại." });
    res.status(200).json(data);
  });
};

// Lấy tất cả voucher (tuỳ chọn lọc theo voucher_code)
const getAllVouchers = (req, res) => {
  const { code } = req.query;

  Voucher.getAll(code, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi lấy danh sách voucher." });
    res.status(200).json(data);
  });
};

// Cập nhật voucher
const updateVoucher = (req, res) => {
  const voucherId = req.params.id;
  const { voucher_code, voucher_value, date_start, date_end } = req.body;

  if (!voucher_code || !voucher_value || !date_start || !date_end) {
    return res.status(400).json({ message: "Thiếu thông tin cập nhật." });
  }

  const updatedVoucher = { voucher_code, voucher_value, date_start, date_end };

  Voucher.updateById(voucherId, updatedVoucher, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi cập nhật voucher." });
    if (!data) return res.status(404).json({ message: "Voucher không tồn tại." });
    res.status(200).json({ message: "Cập nhật voucher thành công", data });
  });
};

// Xoá voucher
const deleteVoucher = (req, res) => {
  const voucherId = req.params.id;

  Voucher.remove(voucherId, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi xoá voucher." });
    if (!data) return res.status(404).json({ message: "Voucher không tồn tại." });
    res.status(200).json({ message: "Xoá voucher thành công" });
  });
};

module.exports = {
  createVoucher,
  getVoucherById,
  getAllVouchers,
  updateVoucher,
  deleteVoucher
};
