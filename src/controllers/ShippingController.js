const Shipping = require('../models/ShippingModel');

// Thêm shipping mới
const createShipping = (req, res) => {
  const { shipping_date, delivery_method, shipping_status, id_customer, id_order, shipping_address } = req.body;

  if (!shipping_date || !delivery_method || !shipping_status || !id_customer || !id_order || !shipping_address) {
    return res.status(400).json({ message: "Thiếu thông tin vận chuyển." });
  }

  const newShipping = new Shipping({ shipping_date, delivery_method, shipping_status, id_customer, id_order, shipping_address });

  Shipping.create(newShipping, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi tạo vận chuyển." });
    res.status(201).json({ message: "Tạo vận chuyển thành công", data });
  });
};

// Lấy thông tin shipping theo id
const getShippingById = (req, res) => {
  const shippingId = req.params.id;

  Shipping.findById(shippingId, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi lấy thông tin vận chuyển." });
    if (!data) return res.status(404).json({ message: "Không tìm thấy thông tin vận chuyển." });
    res.status(200).json(data);
  });
};

// Lấy tất cả shipping
const getAllShipping = (req, res) => {
  Shipping.getAll((err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi lấy danh sách vận chuyển." });
    res.status(200).json(data);
  });
};

// Cập nhật thông tin shipping theo id
const updateShippingById = (req, res) => {
  const shippingId = req.params.id;
  const { shipping_date, delivery_method, shipping_status, id_customer, id_order, shipping_address } = req.body;

  if (!shipping_date || !delivery_method || !shipping_status || !id_customer || !id_order || !shipping_address) {
    return res.status(400).json({ message: "Thiếu thông tin cập nhật." });
  }

  const updatedShipping = { shipping_date, delivery_method, shipping_status, id_customer, id_order, shipping_address };

  Shipping.updateById(shippingId, updatedShipping, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi cập nhật vận chuyển." });
    if (!data) return res.status(404).json({ message: "Vận chuyển không tồn tại." });
    res.status(200).json({ message: "Cập nhật vận chuyển thành công", data });
  });
};

// Xoá shipping theo id
const deleteShippingById = (req, res) => {
  const shippingId = req.params.id;

  Shipping.remove(shippingId, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi xoá vận chuyển." });
    if (!data) return res.status(404).json({ message: "Vận chuyển không tồn tại." });
    res.status(200).json({ message: "Xoá vận chuyển thành công" });
  });
};

module.exports = {
  createShipping,
  getShippingById,
  getAllShipping,
  updateShippingById,
  deleteShippingById
};
