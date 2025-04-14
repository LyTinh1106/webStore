const ProductImage = require('../models/ProductImageModel');

// Thêm ảnh mới
const createImage = (req, res) => {
  const { product_id, URL } = req.body;

  if (!product_id || !URL) {
    return res.status(400).json({ message: "product_id và URL là bắt buộc." });
  }

  const newImage = new ProductImage({ product_id, URL });

  ProductImage.create(newImage, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi thêm ảnh sản phẩm." });
    res.status(201).json({ message: "Thêm ảnh thành công", data });
  });
};


const getImageById = (req, res) => {
  ProductImage.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi tìm ảnh." });
    if (!data) return res.status(404).json({ message: "Không tìm thấy ảnh." });

    res.status(200).json({ message: "OK", data });
  });
};

// Lấy danh sách ảnh theo product_id
const getImagesByProductId = (req, res) => {
  ProductImage.findByProductId(req.params.product_id, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi lấy ảnh." });
    res.status(200).json({ message: "OK", data });
  });
};

// Cập nhật ảnh
const updateImage = (req, res) => {
  const { product_id, URL } = req.body;

  if (!product_id || !URL) {
    return res.status(400).json({ message: "product_id và URL là bắt buộc." });
  }

  const updatedImage = new ProductImage({ product_id, URL });

  ProductImage.updateById(req.params.id, updatedImage, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi cập nhật ảnh." });
    if (!data) return res.status(404).json({ message: "Không tìm thấy ảnh để cập nhật." });

    res.status(200).json({ message: "Cập nhật thành công", data });
  });
};

// Xoá ảnh
const deleteImage = (req, res) => {
  ProductImage.remove(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi xoá ảnh." });
    if (!data) return res.status(404).json({ message: "Không tìm thấy ảnh để xoá." });

    res.status(200).json({ message: "Xoá thành công" });
  });
};

module.exports = {
  createImage,
  getImageById,
  getImagesByProductId,
  updateImage,
  deleteImage,
};
