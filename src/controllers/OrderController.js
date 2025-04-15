const Order = require("../models/OrderModel");

// [GET] /orders - Hiển thị danh sách đơn hàng
exports.getAllOrders = (req, res) => {
  const { status } = req.query;

  Order.getAll(status, (err, data) => {
    if (err) {
      res.status(500).render("error", { message: err.message || "Đã xảy ra lỗi khi lấy danh sách đơn hàng." });
    } else {
      res.render("orderDashboard", { orders: data });
    }
  });
};

// [GET] /orders/:id - Chi tiết đơn hàng
exports.getOrderById = (req, res) => {
  const id = req.params.id;
  Order.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy đơn hàng với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: `Lỗi truy xuất đơn hàng với ID ${id}.` });
      }
    } else {
      res.render("orderDashboard", { order: data, mode: "edit" }); // Nếu dùng chung dashboard, thêm mode
    }
  });
};

// [POST] /orders - Tạo mới đơn hàng
exports.createOrder = (req, res) => {
  const { created_at, payment_method, order_status, product_id, account_id } = req.body;

  if (!created_at || !payment_method || !order_status || !product_id || !account_id) {
    return res.status(400).render("error", { message: "Thiếu thông tin đơn hàng." });
  }

  const newOrder = new Order({ created_at, payment_method, order_status, product_id, account_id });

  Order.create(newOrder, (err, data) => {
    if (err) {
      res.status(500).render("error", { message: err.message || "Lỗi khi tạo đơn hàng." });
    } else {
      res.redirect("/orders");
    }
  });
};

// [POST] /orders/:id/update - Cập nhật đơn hàng
exports.updateOrder = (req, res) => {
  const id = req.params.id;
  const { created_at, payment_method, order_status, product_id, account_id } = req.body;

  if (!created_at || !payment_method || !order_status || !product_id || !account_id) {
    return res.status(400).render("error", { message: "Thiếu thông tin để cập nhật đơn hàng." });
  }

  const updatedOrder = new Order({ created_at, payment_method, order_status, product_id, account_id });

  Order.updateById(id, updatedOrder, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy đơn hàng với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: "Lỗi khi cập nhật đơn hàng." });
      }
    } else {
      res.redirect("/orders");
    }
  });
};

// [POST] /orders/:id/delete - Xóa đơn hàng
exports.deleteOrder = (req, res) => {
  const id = req.params.id;

  Order.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy đơn hàng với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: "Lỗi khi xóa đơn hàng." });
      }
    } else {
      res.redirect("/orders");
    }
  });
};
