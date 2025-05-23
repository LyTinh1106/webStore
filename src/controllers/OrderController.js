const Order = require("../models/OrderModel");
const OrderDetail = require('../models/OrderDetailModel')

// [GET] /orders - Hiển thị danh sách đơn hàng
exports.getAllOrders = (req, res) => {
  const { status } = req.query;

  Order.getAll(status, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Lỗi khi truy xuất đơn hàng.",
        error: err
      });
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
        return res.status(404).json({ message: `Không tìm thấy đơn hàng với ID ${id}.` });
      }
      return res.status(500).json({ message: `Lỗi truy xuất đơn hàng với ID ${id}.`, error: err });
    }


    return res.render("orderDashboard", {
      order: data,
      mode: "edit" 
    });
  });
};


// [POST] /orders - Tạo mới đơn hàng
exports.createOrder = async (req, res) => {
  try {
    const {
      account_id,
      payment_method,
      total_payment,
      cartItems,
      fullname,
      email,
      phone,
      address,
      note,
    } = req.body;

    if (!account_id || !payment_method || !total_payment || !cartItems) {
      return res.status(400).json({ error: "Thiếu thông tin đơn hàng." });
    }

    const newOrder = {
      created_at: new Date(),
      payment_method,
      order_status: 'Chờ duyệt',
      account_id,
      total_payment,
      fullname,
      email,
      phone,
      address,
      note
    };

    Order.create(newOrder, async (err, createdOrder) => {
      if (err) return res.status(500).json({ error: "Lỗi tạo đơn hàng." });

      const orderId = createdOrder.id;
      const items = JSON.parse(cartItems);

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

  Order.delete(id, (err, result) => {
    if (err) {
      console.error(' Lỗi khi xóa đơn hàng:', err);
      return res.status(500).json({ message: 'Xóa thất bại' });
    }

    res.json({ message: 'Xóa thành công' });
  });
};

exports.updateStatus = (req, res) => {
  const id = req.params.id;
  if (req.body.status === "Chờ duyệt") {
    Order.UpdateStatusById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).json({ message: `Không tìm thấy đơn hàng với ID ${id}` });
        } else {
          res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật đơn hàng." });
        }
      } else {
        return res.status(201).json({ success: true, message: "Cập nhật category thành công!", order: data });
      }
    });
  };
};

exports.getRevenue = (req, res) => {
  const year = req.params.year;

  Order.GetRevenueByMonthOfYear(year, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ message: `Không tìm thấy dữ liệu cho năm ${year}.` });
      }
      return res.status(500).json({ message: "Lỗi khi lấy dữ liệu doanh thu.", error: err });
    }

    res.json({
      revenueByMonth: data
    });
  });
};

exports.getProductQuantity = (req, res) => {
  const year = req.params.year;
  Order.GetProuctQuantityByYear(year, (err, data) =>{
    if(err) {
      if( err.kind === "not_found") {
        return res.status(404).json({ message: `Không tìm thấy dữ liệu cho năm ${year}.` });
      }
      return res.status(500).json({ message: "Lỗi khi lấy dữ liệu sản phẩm.", error: err });
    }
    res.json({
      productQuantity: data
    });
  });
};

exports.getYear = (req, res) => {
  Order.GetExistingYear((err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi lấy dữ liệu.", error: err });
    }
    console.log("Năm tìm được:", data);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu năm." });
    }

    res.json({ Year: data });
  });
};

exports.getBasicOnDeliveringOrders = (req, res) => {
  Order.getOnDeliveringBasicInfo((err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi lấy đơn hàng đang giao", error: err });
    }
    res.json(data); // ✅ trả về danh sách JSON
  });
};

// Lấy thông tin chi tiết 1 đơn hàng (thông tin đơn)
exports.getOrderDetailsById = (req, res) => {
  const id = req.params.id;
  Order.findById(id, (err, order) => {
    if (err || !order) {
      return res.status(500).json({ message: "Không thể lấy thông tin đơn hàng", error: err });
    }
    OrderDetail.findByOrderId(id, (err2, items) => {
      if (err2) {
        return res.status(500).json({ message: "Không thể lấy danh sách sản phẩm", error: err2 });
      }
      res.json({ ...order, products: items });
    });
  });
};


