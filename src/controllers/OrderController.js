const Order = require('../models/OrderModel');

// Tạo đơn hàng mới
const createOrder = (req, res) => {
  const { created_at, payment_method, order_status, product_id, account_id } = req.body;

  if (!created_at || !payment_method || !order_status || !product_id || !account_id) {
    return res.status(400).json({ message: "Thiếu thông tin đơn hàng." });
  }

  const newOrder = new Order({ created_at, payment_method, order_status, product_id, account_id });

  Order.create(newOrder, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi tạo đơn hàng." });
    res.status(201).json({ message: "Tạo đơn hàng thành công", data });
  });
};

// Lấy đơn hàng theo ID
const getOrderById = (req, res) => {
  Order.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi tìm đơn hàng." });
    if (!data) return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    res.status(200).json(data);
  });
};

// Lấy tất cả đơn hàng
const getAllOrders = (req, res) => {
  Order.getAll((err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng." });
    res.status(200).json(data);
  });
};

// Cập nhật đơn hàng
const updateOrder = (req, res) => {
  const { created_at, payment_method, order_status, product_id, account_id } = req.body;

  if (!created_at || !payment_method || !order_status || !product_id || !account_id) {
    return res.status(400).json({ message: "Thiếu thông tin để cập nhật đơn hàng." });
  }

  const updatedOrder = new Order({ created_at, payment_method, order_status, product_id, account_id });

  Order.updateById(req.params.id, updatedOrder, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi cập nhật đơn hàng." });
    if (!data) return res.status(404).json({ message: "Không tìm thấy đơn hàng để cập nhật." });
    res.status(200).json({ message: "Cập nhật đơn hàng thành công", data });
  });
};

// Xoá đơn hàng
const deleteOrder = (req, res) => {
  Order.remove(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi xoá đơn hàng." });
    if (!data) return res.status(404).json({ message: "Không tìm thấy đơn hàng để xoá." });
    res.status(200).json({ message: "Xoá đơn hàng thành công" });
  });
};

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
