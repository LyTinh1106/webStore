const Category = require('../models/CategoryModel');

// [GET] /categories - Hiển thị danh sách category
exports.getAllCategories = (req, res) => {
  Category.getAll((err, data) => {
    if (err) {
      res.status(500).render("error", { message: err.message || "Some error occurred." });
    } else {
      res.render("dashboard", { categories: data });
    }
  });
};

// [GET] /categories/:id - Chi tiết category (nếu cần)
exports.getCategoryById = (req, res) => {
  const id = req.params.id;
  Category.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Category với ID ${id} không tồn tại.` });
      } else {
        res.status(500).render("error", { message: `Lỗi truy xuất category với ID ${id}` });
      }
    } else {
      res.render("dashboard", { category: data });
    }
  });
};

// [POST] /categories - Tạo mới category
exports.createCategory = (req, res) => {
  const cat_name = req.body.name?.trim();
  if (!cat_name) {
    // return res.status(400).render("error", { message: "Tên category không được để trống." });
    return res.status(400).send("Tên category không được để trống.");
  }

  const newCategory = new Category({ name: cat_name });
  Category.create(newCategory, (err, data) => {
    if (err) {
      res.status(500).render("error", { message: err.message || "Lỗi khi tạo category." });
    } else {
      return res.status(201).json({ success: true, message: "Tạo category thành công!", category: data });
    }
  });
};

// [POST] /categories/:id/update - Cập nhật category
exports.updateCategory = (req, res) => {
  const id = req.params.id;

  if (!req.body.name) {
    return res.status(400).render("error", { message: "Tên category không được để trống." });
  }

  Category.updateById(id, new Category(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy category với ID ${id}` });
      } else {
        res.status(500).render("error", { message: "Lỗi khi cập nhật category." });
      }
    } else {
      return res.status(201).json({ success: true, message: "Xóa category thành công!", category: data });
    }
  });
};

// [POST] /categories/:id/delete - Xóa category
exports.deleteCategory = (req, res) => {
  const id = req.params.id;

  Category.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy category với ID ${id}` });
      } else {
        res.status(500).render("error", { message: "Lỗi khi xóa category." });
      }
    } else {
      return res.status(201).json({ success: true, message: "Xóa category thành công!", brand: data });
    }
  });
};
