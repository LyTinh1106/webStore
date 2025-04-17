const Brand = require("../models/BrandModel");

// [GET] /brands - Hiển thị danh sách brand
exports.getAllBrands = (req, res) => {
  const name = req.query.name;

  Brand.getAll(name, (err, data) => {
    if (err) {
      res.status(500).render("error", { message: err.message || "Đã xảy ra lỗi khi lấy danh sách brand." });
    } else {
      res.render("brandDashboard", { brands: data });
    }
  });
};

// [GET] /brands/:id - Chi tiết brand
exports.getBrandById = (req, res) => {
  const id = req.params.id;
  Brand.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy brand với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: `Lỗi truy xuất brand với ID ${id}.` });
      }
    } else {
      res.render("brandDashboard", { brand: data, mode: "edit" }); // Nếu dùng chung dashboard, thêm mode
    }
  });
};

// [POST] /brands - Tạo mới brand
exports.createBrand = (req, res) => {
  const name = req.body.brand_name?.trim();
  if (!name) {
    return res.status(400).render("error", { message: "Tên brand không được để trống." });
  }

  const newBrand = new Brand({ brand_name: name });
  Brand.create(newBrand, (err, data) => {
    if (err) {
      res.status(500).render("error", { message: err.message || "Lỗi khi tạo brand." });
    } else {
      return res.status(201).json({ success: true, message: "Tạo brand thành công!", brand: data });


    }
  });
};

// [POST] /brands/:id/update - Cập nhật brand
exports.updateBrand = (req, res) => {
  const id = req.params.id;
  const name = req.body.brand_name?.trim();

  if (!name) {
    return res.status(400).render("error", { message: "Tên brand không được để trống." });
  }

  Brand.updateById(id, new Brand({ brand_name: name }), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy brand với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: "Lỗi khi cập nhật brand." });
      }
    } else {
      res.redirect("/brands");
    }
  });
};

// [POST] /brands/:id/delete - Xóa brand
exports.deleteBrand = (req, res) => {
  const id = req.params.id;

  Brand.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy brand với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: "Lỗi khi xóa brand." });
      }
    } else {
      return res.status(201).json({ success: true, message: "Xóa brand thành công!", brand: data });

    }
  });
};
