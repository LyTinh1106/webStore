const Order = require("../models/OrderModel");
const OrderDetail = require('../models/OrderDetailModel')
const nodemailer = require("nodemailer");




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

// [POST] /orders/create - Tạo đơn hàng và gửi email
exports.createOrderAndSendEmail = async (req, res) => {
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
      discount_amount = 0,   
      discount_code = ''    
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
      shipping_fee: 0,
      discount_amount,    
      discount_code,
      fullname,
      email,
      phone,
      address,
      note
    };

    Order.create(newOrder, async (err, createdOrder) => {
      if (err) return res.status(500).json({ error: "Lỗi tạo đơn hàng." });

      const orderId = createdOrder.id;
      const randomPart = ('0000' + (orderId * 7919 % 10000)).slice(-4);
      const order_code = `#${randomPart}${orderId}`;

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

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Chuyển discount_amount sang số nguyên để hiển thị
      const discountAmountInt = parseInt(discount_amount) || 0;

      const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
  <h2 style="text-align: center; color: #333; font-size: 28px; margin-bottom: 24px;">VTVT Store</h2>
  <h4 style="font-size: 18px; margin-bottom: 16px;">Xin chào <strong>${fullname}</strong>,</h4>
  <p style="font-size: 16px; margin-bottom: 16px;">Bạn đã đặt hàng thành công tại <strong>VTVT Store</strong>.</p>

  <p style="font-size: 16px; margin-bottom: 16px;"><strong>Mã đơn hàng:</strong> <span style="color: #007bff;">${order_code}</span></p>

  <h5 style="font-size: 18px; margin-bottom: 12px;">Thông tin giao hàng:</h5>
  <p style="font-size: 16px; margin-bottom: 8px;"><strong>Địa chỉ:</strong> ${address}</p>
  <p style="font-size: 16px; margin-bottom: 8px;"><strong>SĐT:</strong> ${phone}</p>
  <p style="font-size: 16px; margin-bottom: 8px;"><strong>Phương thức thanh toán:</strong> ${payment_method}</p>

  <h5 style="font-size: 18px; margin-bottom: 12px;">Chi tiết đơn hàng:</h5>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 16px;">
    <thead>
      <tr>
        <th style="border-bottom: 1px solid #ddd; text-align: left; padding: 8px;">Sản phẩm</th>
        <th style="border-bottom: 1px solid #ddd; text-align: right; padding: 8px;">Thành tiền</th>
      </tr>
    </thead>
    <tbody>
      ${items.map(item => `
      <tr>
        <td style="border-bottom: 1px solid #f1f1f1; padding: 8px;">${item.name} × ${item.qty}</td>
        <td style="border-bottom: 1px solid #f1f1f1; padding: 8px; text-align: right;">${(item.price * item.qty).toLocaleString()} VND</td>
      </tr>
      `).join('')}
      
      ${discountAmountInt > 0 ? `
      <tr>
        <td style="padding: 8px; font-weight: bold;">Giảm giá ${discount_code ? `(${discount_code})` : ''}</td>
        <td style="padding: 8px; text-align: right; color: red; font-weight: bold;">- ${discountAmountInt.toLocaleString()} VND</td>
      </tr>
      ` : ''}

      <tr>
        <td style="padding: 8px; font-weight: bold;">Phí vận chuyển</td>
        <td style="padding: 8px; text-align: right; font-weight: bold;">0 VND</td>
      </tr>
    </tbody>
  </table>

  <p style="text-align: right; font-size: 28px; font-weight: bold; margin-top: 0; margin-bottom: 24px;">
    Tổng tiền: ${parseInt(total_payment).toLocaleString()} VND
  </p>

  <p style="font-size: 16px; font-weight: bold; color: #777; text-align: center; margin-top: 20px;">
    Cảm ơn bạn đã mua hàng tại VTVT Store!
  </p>
</div>
`;

      transporter.sendMail({
        from: '"VTVT Store" <yourshopemail@gmail.com>',
        to: email,
        subject: "Thông báo đặt đơn hàng từ VTVT Store",
        html
      }, (emailErr, info) => {
        if (emailErr) {
          console.error("Lỗi gửi email:", emailErr);
        } else {
          console.log("Đã gửi email:", info.response);
        }
      });

      if (payment_method === "MoMo") {
        return res.json({
          message: "Tạo đơn hàng thành công",
          payUrl: `/api/checkout/payment/momo?orderId=${orderId}&amount=${total_payment}`,
          orderId: orderId,
          orderCode: order_code
        });
      } else {
        return res.json({
          message: "Tạo đơn hàng thành công",
          orderId: orderId,
          orderCode: order_code
        });
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



