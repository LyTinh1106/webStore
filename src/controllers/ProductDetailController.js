const TechnicalSpecification = require("../models/ProductDetailModel");

// Tạo mới
const createSpecification = (req, res) => {
  const { specs, product_id } = req.body;

  if (!specs || !product_id) {
    return res.status(400).json({ message: "specs và product_id là bắt buộc." });
  }

  const newSpec = new TechnicalSpecification({ specs, product_id });

  TechnicalSpecification.create(newSpec, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi tạo thông số kỹ thuật." });
    res.status(201).json({ message: "Tạo thành công", data });
  });
};

// Lấy theo ID
const getSpecificationById = (req, res) => {
  const specId = parseInt(req.params.id);

  if (isNaN(specId)) {
    return res.status(400).json({
      success: false,
      message: "ID không hợp lệ.",
    });
  }

  TechnicalSpecification.findById(specId, (err, spec) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy thông số kỹ thuật.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi khi truy xuất dữ liệu.",
      });
    }

    // Nếu specs là chuỗi JSON, parse luôn tại đây (bảo vệ phía controller)
    if (spec.specs && typeof spec.specs === "string") {
      try {
        spec.specs = JSON.parse(spec.specs);
      } catch (e) {
        console.warn("Không thể parse specs:", e);
        spec.specs = {};
      }
    }

    res.status(200).json({
      success: true,
      message: "Lấy thông tin thành công.",
      data: spec
    });
  });
};


// Lấy theo product_id
const getSpecificationByProductId = (req, res) => {
  TechnicalSpecification.findByProductId(req.params.product_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") return res.status(404).json({ message: "Không tìm thấy." });
      return res.status(500).json({ message: "Lỗi khi tìm." });
    }

    res.status(200).json({ message: "ok", data });
  });
};

// Cập nhật
const updateSpecification = (req, res) => {
  const { specs, product_id } = req.body;

  if (!specs || !product_id) {
    return res.status(400).json({ message: "specs và product_id là bắt buộc." });
  }

  const updatedSpec = new TechnicalSpecification({ specs, product_id });

  TechnicalSpecification.updateById(req.params.id, updatedSpec, (err, data) => {
    if (err) {
      if (err.kind === "not_found") return res.status(404).json({ message: "Không tìm thấy." });
      return res.status(500).json({ message: "Lỗi khi cập nhật." });
    }

    res.status(200).json({ message: "Cập nhật thành công", data });
  });
};

// Xoá
const deleteSpecification = (req, res) => {
  TechnicalSpecification.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") return res.status(404).json({ message: "Không tìm thấy." });
      return res.status(500).json({ message: "Lỗi khi xoá." });
    }

    res.status(200).json({ message: "Xoá thành công" });
  });
};

module.exports = {
  createSpecification,
  getSpecificationById,
  getSpecificationByProductId,
  updateSpecification,
  deleteSpecification,
};
