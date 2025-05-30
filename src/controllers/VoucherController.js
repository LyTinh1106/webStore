const Voucher = require("../models/VoucherModel");

// [GET] /vouchers - Hiển thị danh sách voucher (có lọc theo code)
exports.getAllVouchers = (req, res) => {
  const code = req.query.code?.trim();

  Voucher.getAll(code, (err, data) => {
    if (err) {
       return res.status(500).json({ message: `Lỗi khi lấy danh sách voucher.` });
    } else {
      res.render("voucherDashboard", { vouchers: data });
    }
  });
};

// [GET] /vouchers/:id - Chi tiết voucher
exports.getVoucherById = (req, res) => {
  const id = req.params.id;

  Voucher.findById(id, (err, data) => {
    if (err) {
      return res.status(500).json({ message: `Lỗi khi truy xuất voucher với ID ${id}.` });
    } else if (!data) {
        return res.status(404).json({ message: `Không tìm thấy voucher với ID ${id}.` });
    } else {
      res.render("voucherDashboard", { voucher: data, mode: "edit" });
    }
  });
};

// [POST] /vouchers - Tạo mới voucher
exports.createVoucher = (req, res) => {
  const voucher_code = req.body.voucher_code?.trim();
  const voucher_value = req.body.voucher_value;
  const date_start = req.body.date_start?.trim();
  const date_end = req.body.date_end?.trim();

  if (!voucher_code || !voucher_value || !date_start || !date_end) {
    return res.status(400).render("error", { message: "Thiếu thông tin voucher." });
  }

  const newVoucher = new Voucher({ voucher_code, voucher_value, date_start, date_end });

  Voucher.create(newVoucher, (err, data) => {
    if (err) {
      return res.status(500).json({ message: `Lỗi khi tạo voucher.` });
    } else {
      return res.status(201).json({ success: true, message: "Tạo voucher thành công!", voucher: data });
    }
  });
};

// [POST] /vouchers/:id/update - Cập nhật voucher
exports.updateVoucher = (req, res) => {
  const id = req.params.id;
  const voucher_code = req.body.voucher_code?.trim();
  const voucher_value = req.body.voucher_value;
  const date_start = req.body.date_start?.trim();
  const date_end = req.body.date_end?.trim();

  if (!voucher_code || !voucher_value || !date_start || !date_end) {
    return res.status(400).json({ message: "Thiếu thông tin cập nhật voucher." });
  }

  const updatedVoucher = new Voucher({ voucher_code, voucher_value, date_start, date_end });

  Voucher.updateById(id, updatedVoucher, (err, data) => {
    if (err) {
      res.status(500).json({ message: `Lỗi khi cập nhật voucher với ID ${id}.` });
    } else if (!data) {
      res.status(404).json({ message: `Không tìm thấy voucher với ID ${id}.` });
    } else {
      return res.status(201).json({ success: true, message: "Cập nhật voucher thành công!", voucher: data });
    }
  });
};

// [POST] /vouchers/:id/delete - Xoá voucher
exports.deleteVoucher = (req, res) => {
  const id = req.params.id;

  Voucher.remove(id, (err, data) => {
    if (err) {
      res.status(500).render("error", { message: `Lỗi khi xoá voucher với ID ${id}.` });
    } else if (!data) {
      res.status(404).render("error", { message: `Không tìm thấy voucher với ID ${id}.` });
    } else {
      return res.status(201).json({ success: true, message: "Xóa voucher thành công!", voucher: data });
    }
  });
};
// [POST] /vouchers/apply - Áp dụng mã giảm giá
exports.applyVoucher = (req, res) => {
  const code = req.body.code?.trim();
  if (!code) {
    return res.status(200).json({ success: false, message: "Không có mã được áp dụng." });
  }

  const now = new Date().toISOString().slice(0, 19).replace("T", " ");

  Voucher.findByCodeAndValidDate(code, now, (err, data) => {
    if (err) return res.status(500).json({ error: "Lỗi server" });
    if (!data) return res.status(404).json({ error: "Mã không hợp lệ hoặc hết hạn" });

    return res.status(200).json({ success: true, voucher: data });
  });
};
