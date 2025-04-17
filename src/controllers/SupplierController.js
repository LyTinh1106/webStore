const Supplier = require('../models/SupplierModel');

// [GET] /suppliers - Lấy danh sách nhà cung cấp
const getAllSuppliers = (req, res) => {
  Supplier.getAll((err, data) => {
    if (err) {
      res.status(500).render("error", { message: "Lỗi khi lấy danh sách nhà cung cấp." });
    } else {
      res.render("supplierDashboard", { suppliers: data });
    }
  });
};

// [GET] /suppliers/:id - Hiển thị chi tiết nhà cung cấp để sửa
const getSupplierById = (req, res) => {
  const id = req.params.id;
  Supplier.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy nhà cung cấp với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: `Lỗi truy xuất nhà cung cấp với ID ${id}.` });
      }
    } else {
      res.render("supplierDashboard", { supplier: data, mode: "edit" });
    }
  });
};

// [POST] /suppliers - Tạo mới nhà cung cấp
const createSupplier = (req, res) => {
  const { name, phonenumber, email, address } = req.body;

  if (!name || !phonenumber || !email || !address) {
    return res.status(400).render("error", { message: "Thiếu thông tin nhà cung cấp." });
  }

  const newSupplier = new Supplier({ name, phonenumber, email, address });

  Supplier.create(newSupplier, (err, data) => {
    if (err) {
      res.status(500).render("error", { message: "Lỗi khi tạo nhà cung cấp." });
    } else {
      return res.status(201).json({ success: true, message: "Tạo supplier thành công!", Supplier: data });

    }
  });
};

// [POST] /suppliers/:id/update - Cập nhật nhà cung cấp
const updateSupplier = (req, res) => {
  const id = req.params.id;
  const { name, phonenumber, email, address } = req.body;

  if (!name || !phonenumber || !email || !address) {
    return res.status(400).render("error", { message: "Thiếu thông tin để cập nhật nhà cung cấp." });
  }

  const updatedSupplier = new Supplier({ name, phonenumber, email, address });

  Supplier.updateById(id, updatedSupplier, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy nhà cung cấp với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: "Lỗi khi cập nhật nhà cung cấp." });
      }
    } else {
      res.redirect("/suppliers");
    }
  });
};

// [POST] /suppliers/:id/delete - Xóa nhà cung cấp
const deleteSupplier = (req, res) => {
  const id = req.params.id;

  Supplier.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy nhà cung cấp với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: "Lỗi khi xoá nhà cung cấp." });
      }
    } else {
      return res.status(201).json({ success: true, message: "Xóa nhà cung cấp thành công!",Supplier: data });
    }
  });
};

// ✅ Export tất cả các controller ở dưới cùng
module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
};
