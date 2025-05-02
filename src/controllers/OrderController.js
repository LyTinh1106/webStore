const Order = require("../models/OrderModel");
const OrderDetail = require('../models/OrderDetailModel')

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


exports.createOrder = async (req, res) => {
  try {
    const { account_id, payment_method, total_payment, cartItems } = req.body;

    if (!account_id || !payment_method || !total_payment || !cartItems) {
      return res.status(400).json({ error: "Thiếu thông tin đơn hàng." });
    }

    const newOrder = {
      created_at: new Date(),
      payment_method,
      order_status: 'approving',
      account_id,
      total_payment
    };

    Order.create(newOrder, async (err, createdOrder) => {
      if (err) return res.status(500).json({ error: "Lỗi tạo đơn hàng." });

      const orderId = createdOrder.id;
      const items = JSON.parse(cartItems);

      // Duyệt từng item theo cách tuần tự
      for (let item of items) {
        const detail = {
          order_id: orderId,
          product_id: item.id,
          quantity: item.qty,
          subtotalprice: item.price * item.qty
        };

        await new Promise((resolve, reject) => {
          OrderDetail.create(detail, err => {
            if (err) return reject(err);
            resolve();
          });
        });
      }

      // ✅ Trả kết quả cuối cùng
      if (payment_method === "MoMo") {
        return res.json({
          message: "Tạo đơn hàng thành công",
          payUrl: `/api/checkout/payment/momo?orderId=${orderId}&amount=${total_payment}`
        });
      } else {
        return res.json({ message: "Tạo đơn hàng thành công" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Đã xảy ra lỗi khi tạo đơn hàng." });
  }
};




// [POST] /orders/:id/update - Cập nhật đơn hàng
exports.updateOrder = (req, res) => {
  const id = req.params.id;
  const { created_at, payment_method, order_status, account_id, total_payment } = req.body;

  if (!created_at || !payment_method || !order_status || !product_id || !account_id) {
    return res.status(400).render("error", { message: "Thiếu thông tin để cập nhật đơn hàng." });
  }

  const updatedOrder = new Order({ created_at, payment_method, order_status, account_id, total_payment });


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
