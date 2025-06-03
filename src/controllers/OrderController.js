const Order = require("../models/OrderModel");
const OrderDetail = require('../models/OrderDetailModel');
const Voucher = require('../models/VoucherModel'); 
const nodemailer = require("nodemailer");

// [GET] /orders - Hiển thị danh sách đơn hàng
exports.getAllOrders = (req, res) => {
  const { status } = req.query;

  Order.getAll((err, data) => {
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

    // Tính subtotal từ products
    let subtotal = 0;
    if (Array.isArray(data.products)) {
      data.products.forEach(item => {
        subtotal += Number(item.subtotalprice) || 0;
      });
    }

    // Lấy voucher_value (phần trăm giảm) từ data.voucher_value
    const voucherValue = parseInt(data.voucher_value) || 0;
    // Tính tiền giảm
    const discount_amount = voucherValue > 0
      ? Math.floor(subtotal * voucherValue / 100)
      : 0;

    // Gán vào data để view có thể sử dụng
    data.discount_amount = discount_amount;
    data.total_after_discount = Number(data.total_payment) || 0; // tiền sau giảm đã lưu

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
      discount_code = ""
    } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!account_id || !payment_method || !total_payment || !cartItems) {
      return res.status(400).json({ error: "Thiếu thông tin đơn hàng." });
    }

    // 1. Lấy voucher_id nếu có discount_code
    let voucher_id = null;
    if (discount_code) {
      // Tính currentDate ở định dạng YYYY-MM-DD HH:mm:ss
      const now = new Date().toISOString().slice(0, 19).replace("T", " ");
      try {
        const voucherData = await new Promise((resolve, reject) => {
          Voucher.findByCodeAndValidDate(
            discount_code,
            now,
            (errVoucher, dataVoucher) => {
              if (errVoucher) return reject(errVoucher);
              if (!dataVoucher) return reject({ kind: "voucher_not_found" });
              resolve(dataVoucher);
            }
          );
        });
        voucher_id = voucherData.id;
      } catch (errVoucher) {
        if (errVoucher.kind === "voucher_not_found") {
          return res
            .status(400)
            .json({ error: "Voucher không hợp lệ hoặc đã hết hạn." });
        }
        return res.status(500).json({ error: "Lỗi khi kiểm tra voucher." });
      }
    }

    // 2. Lấy thời điểm tạo đơn
    const createdAt = new Date();
    const day     = String(createdAt.getDate()).padStart(2, "0");
    const month   = String(createdAt.getMonth() + 1).padStart(2, "0");
    const year    = createdAt.getFullYear();
    const hours   = String(createdAt.getHours()).padStart(2, "0");
    const minutes = String(createdAt.getMinutes()).padStart(2, "0");
    const seconds = String(createdAt.getSeconds()).padStart(2, "0");

    
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    // 3. Tạo đối tượng order để lưu vào DB, có voucher_id
    const newOrder = {
      created_at: createdAt,
      payment_method,
      order_status: "Chờ duyệt",
      account_id,
      total_payment,
      
      fullname,
      email,
      phone,
      address,
      note,
      order_payment: "Chưa thanh toán",
      voucher_id        // <-- Gán voucher_id (hoặc null)
    };

    // 4. Lưu đơn mới vào database
    Order.create(newOrder, async (err, createdOrder) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi tạo đơn hàng." });
      }

      // 5. Tạo mã đơn hàng sau khi lưu
      const orderId = createdOrder.id;
      const randomPart = ("0000" + (orderId * 7919 % 10000)).slice(-4);
      const order_code = `#${randomPart}${orderId}`;

      // 6. Lưu chi tiết sản phẩm (OrderDetail)
      const items = JSON.parse(cartItems);
      for (let item of items) {
        const detail = {
          order_id: orderId,
          product_id: item.id,
          quantity: item.qty,
          subtotalprice: item.price * item.qty
        };
        await new Promise((resolve, reject) => {
          OrderDetail.create(detail, errDetail => {
            if (errDetail) return reject(errDetail);
            resolve();
          });
        });
      }

      // 7. Gửi email xác nhận
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const discountAmountInt = parseInt(discount_amount) || 0;
     const html = `
<div style="background-color: #f0f2f5; padding: 20px 0;">
  <div style="max-width: 600px; margin: auto; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    <div style="background-color: #007bff; padding: 16px 0; text-align: center;">
      <h2 style="color: #ffffff; font-size: 28px; margin: 0;">VTVT Store</h2>
    </div>
    <div style="background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif; color: #333;">
      <p style="font-size: 16px; margin-bottom: 16px;">
        Xin chào <strong>${fullname}</strong>,
      </p>
      <p style="font-size: 16px; margin-bottom: 16px;">
        <strong>Mã đơn hàng:</strong>
        <span style="color: #007bff;">${order_code}</span>
      </p>
      <p style="font-size: 16px; margin-bottom: 16px;">
        <strong>Ngày đặt hàng:</strong> ${formattedDateTime}
      </p>
      <!-- Thông tin giao hàng -->
      <h5 style="font-size: 18px; margin-bottom: 8px; color: #555;">Thông tin giao hàng:</h5>
      <p style="font-size: 16px; margin: 4px 0;">
        <strong>Địa chỉ:</strong> ${address}
      </p>
      <p style="font-size: 16px; margin: 4px 0;">
        <strong>SDT:</strong> ${phone}
      </p>
      <p style="font-size: 16px; margin: 4px 0;">
        <strong>Phương thức thanh toán:</strong> ${payment_method}
      </p>
      <!-- Chi tiết đơn hàng -->
      <h5 style="font-size: 18px; margin: 16px 0 8px 0; color: #555;">Chi tiết đơn hàng:</h5>
      <table style="width: 100%; border-collapse: collapse; font-size: 16px; margin-bottom: 12px;">
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
            <td style="border-bottom: 1px solid #f1f1f1; padding: 8px; text-align: right;">
              ${(item.price * item.qty).toLocaleString()} VND
            </td>
          </tr>
          `).join("")}

          ${discountAmountInt > 0 ? `
          <tr>
            <td style="padding: 8px; font-weight: bold; color: black;">
              Giảm giá ${discount_code ? `(${discount_code})` : ""}
            </td>
            <td style="padding: 8px; text-align: right; color: black; font-weight: bold;">
              - ${discountAmountInt.toLocaleString()} VND
            </td>
          </tr>
          ` : ""}

          <tr>
            <td style="padding: 8px; font-weight: bold;">Phí vận chuyển</td>
            <td style="padding: 8px; text-align: right; font-weight: bold;">0 VND</td>
          </tr>
        </tbody>
      </table>
      <!-- Tổng tiền (màu đỏ, in đậm, nằm bên phải) -->
      <p style="color: red; text-align: right; font-size: 20px; font-weight: bold; margin: 0 0 20px 0;">
        Tổng tiền: ${parseInt(total_payment).toLocaleString()} VND
      </p>
      <!-- Lời cảm ơn -->
      <p style="font-size: 16px; color: #777; text-align: center; margin-top: 20px;">
        Cảm ơn bạn đã mua hàng tại VTVT Store!
      </p>
    </div>
  </div>
</div>
`; 

      transporter.sendMail(
        {
          from: `"VTVT Store" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Thông báo đặt đơn hàng từ VTVT Store",
          html
        },
        (emailErr, info) => {
          if (emailErr) {
            console.error("Lỗi gửi email:", emailErr);
          } else {
            console.log("Đã gửi email:", info.response);
          }
        }
      );

      // 8. Trả về JSON cho frontend
      if (payment_method === "MoMo") {
        return res.json({
          message: "Tạo đơn hàng thành công",
          payUrl: `/api/checkout/payment/momo?orderId=${orderId}&amount=${total_payment}`,
          orderId,
          orderCode: order_code
        });
      } else {
        return res.json({
          message: "Tạo đơn hàng thành công",
          orderId,
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
        return res.status(201).json({ success: true, message: "Cập nhật trạng thái thành công!", order: data });
      }
    });
  };
};

exports.getRevenueByYear = (req, res) => {
  const year = req.params.year;

  Order.GetRevenueByMonthOfYear(year, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ message: `Không tìm thấy dữ liệu cho năm ${year}.` });
      }
      return res.status(500).json({ message: "Lỗi khi lấy dữ liệu doanh thu.", error: err });
    }

    res.json({
      revenue: data
    });
  });
};

exports.getRevenueByMonth = (req, res) => {
  const year = req.params.year;
  const month = req.params.month;

  Order.GetRevenueByDayOfMonth(year, month, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ message: `Không tìm thấy dữ liệu cho tháng ${month}.` });
      }
      return res.status(500).json({ message: "Lỗi khi lấy dữ liệu doanh thu.", error: err });
    }

    res.json({
      revenue: data
    });
  });
};

exports.getRevenueByQuarters = (req, res) => {
  const year = req.params.year;

  Order.GetRevenueByQuatersOfYear(year, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ message: `Không tìm thấy dữ liệu cho quý của năm ${year}.` });
      }
      return res.status(500).json({ message: "Lỗi khi lấy dữ liệu doanh thu.", error: err });
    }

    res.json({
      revenue: data
    });
  });
};

exports.getRevenueByDateRange = (req, res) => {
  const dateStart = req.params.dateStart;
  const dateEnd = req.params.dateEnd;
  Order.GetRevenueByDateRange(dateStart, dateEnd, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ message: `Không tìm thấy dữ liệu từ ngày ${dateStart} đến ngày ${dateEnd}.` });
      }
      return res.status(500).json({ message: "Lỗi khi lấy dữ liệu doanh thu.", error: err });
    }

    res.json({
      revenue: data
    });
  });
};

exports.getProductQuantityByYear = (req, res) => {
  const year = req.params.year;
  Order.GetProuctQuantityByYear(year, (err, data) => {
    if(err) {
      if(err.kind === "not_found") {
        return res.status(404).json({ message: `Không tìm thấy dữ liệu cho năm ${year}.` });
      }
      return res.status(500).json({ message: "Lỗi khi lấy dữ liệu sản phẩm.", error: err });
    }
    res.json({
      productQuantity: data
    });
  });
};

exports.getProductQuantityByMonth =  (req, res) => {
  const year = req.params.year;
  const month = req.params.month;
  Order.GetProductQuantityByMonth(year, month, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ message: `Không tìm thấy dữ liệu cho tháng ${month} của năm ${year}.` });
      }
      return res.status(500).json({ message: "Lỗi khi lấy dữ liệu sản phẩm.", error: err });
    }
    res.json({
      productQuantity: data
    });
  });
};

exports.getProductQuantityByQuarters = (req, res) => {
  const year = req.params.year;
  Order.GetProductQuantityByQuaters(year, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ message: `Không tìm thấy dữ liệu cho quý của năm ${year}.` });
      }
      return res.status(500).json({ message: "Lỗi khi lấy dữ liệu sản phẩm.", error: err });
    }
    res.json({
      productQuantity: data
    });
  });
};

exports.getProductQuantityByDateRange = (req, res) => {
  const dateStart = req.params.dateStart;
  const dateEnd = req.params.dateEnd;
  Order.GetProductQuantityByDateRange(dateStart, dateEnd, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ message: `Không tìm thấy dữ liệu từ ngày ${dateStart} đến ngày ${dateEnd}.` });
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
    res.json(data);
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

      // Tính số tiền giảm (discount_amount) nếu có voucher_value
      const voucherValue = parseInt(order.voucher_value) || 0;
      const totalAfter = parseInt(order.total_payment) || 0;
      let discount_amount = 0;
      if (voucherValue > 0 && totalAfter > 0) {
        discount_amount = Math.round((totalAfter * voucherValue) / (100 - voucherValue));
      }

      res.json({ 
        ...order, 
        discount_amount, 
        products: items 
      });
    });
  });
};

