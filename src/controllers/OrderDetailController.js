const OrderDetail = require('../models/OrderDetailModel');
const Order = require('../models/OrderModel'); 

// Thêm chi tiết đơn hàng
const createOrderDetail = (req, res) => {
  const { order_id, product_id, quantity, subtotalprice } = req.body;

  if (!order_id || !product_id || !quantity || !subtotalprice) {
    return res.status(400).json({ message: "Thiếu thông tin chi tiết đơn hàng." });
  }

  const newDetail = new OrderDetail({ order_id, product_id, quantity, subtotalprice });

  OrderDetail.create(newDetail, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi thêm chi tiết đơn hàng." });
    res.status(201).json({ message: "Thêm chi tiết đơn hàng thành công", data });
  });
};

// Lấy chi tiết đơn hàng theo order_id
const getDetailsByOrderId = (req, res) => {
  const id = req.params.orderId;

  OrderDetail.findByOrderId(id, (err, details) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi khi lấy chi tiết sản phẩm.' });
    }

    res.json(details); // ✅ Trả JSON để fetch xử lý
  });
};


// Lấy toàn bộ chi tiết đơn hàng
const getAllOrderDetails = (req, res) => {
  OrderDetail.getAll((err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi lấy danh sách chi tiết đơn hàng." });
    res.status(200).json(data);
  });
};

// Cập nhật chi tiết đơn hàng
const updateOrderDetail = (req, res) => {
  const { orderId, productId } = req.params;
  const { quantity, subtotalprice } = req.body;

  if (!quantity || !subtotalprice) {
    return res.status(400).json({ message: "Thiếu thông tin cập nhật." });
  }

  OrderDetail.update(orderId, productId, { quantity, subtotalprice }, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi cập nhật chi tiết đơn hàng." });
    if (!data) return res.status(404).json({ message: "Không tìm thấy chi tiết đơn hàng." });
    res.status(200).json({ message: "Cập nhật thành công", data });
  });
};

// Xoá chi tiết đơn hàng
const deleteOrderDetail = (req, res) => {
  const { orderId, productId } = req.params;

  OrderDetail.remove(orderId, productId, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi khi xoá chi tiết đơn hàng." });
    if (!data) return res.status(404).json({ message: "Không tìm thấy chi tiết để xoá." });
    res.status(200).json({ message: "Xoá thành công" });
  });
};

module.exports = {
  createOrderDetail,
  getDetailsByOrderId,
  getAllOrderDetails,
  updateOrderDetail,
  deleteOrderDetail
};
