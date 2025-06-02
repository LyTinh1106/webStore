const Shipping     = require("../models/ShippingModel");
const nodemailer   = require('nodemailer');
const Customer     = require('../models/CustomerModel');
const OrderDetail  = require('../models/OrderDetailModel');
const Order        = require("../models/OrderModel");


// 1) Lấy tất cả trong bảng shipping
const getAllShipping = (req, res) => {
  Shipping.getAll(async (err, data) => {
    if (err) {
      return res.status(500).render("error", { message: err.message || "Đã xảy ra lỗi khi lấy danh sách vận chuyển." });
    }
    try {
      
      const enriched = await Promise.all(data.map(async sh => {
        const order = await new Promise((r, j) =>
          Order.findById(sh.id_order, (e, d) => e ? j(e) : r(d))
        );
        return {
          ...sh,
          customer_name: order.fullname 
        };
      }));
      res.render("shippingDashboard", { shippings: enriched });
    } catch(fetchErr) {
      console.error("Không thể lấy fullname từ order:", fetchErr);
    
      res.render("shippingDashboard", { shippings: data });
    }
  });
};

//Lấy thông tin vận chuyển theo ID
const getShippingById = (req, res) => {
  const id = req.params.id;
  Shipping.findById(id, async (err, shipping) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).render("error", { message: `Không tìm thấy vận chuyển ID ${id}.` });
      }
      return res.status(500).render("error", { message: `Lỗi khi truy xuất vận chuyển ID ${id}.` });
    }
    try {
      const order = await new Promise((r, j) =>
        Order.findById(shipping.id_order, (e, d) => e ? j(e) : r(d))
      );
      shipping.customer_name = order.fullname;
      res.render("shippingDashboard", { shipping, mode: "edit" });
    } catch(fetchErr) {
      console.error("Không thể lấy fullname từ order:", fetchErr);
      res.render("shippingDashboard", { shipping, mode: "edit" });
    }
  });
};


const formatDateTime = date => {
  const d = new Date(date);
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
       + ` ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const generateCode = (id, multiplier) => {
  const rand = ('0000' + (id * multiplier % 10000)).slice(-4);
  return `#${rand}${id}`;
};

// tạo transporter gửi mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const createShippingAndSendEmail = async (req, res) => {
  try {
    const {
      shipping_date,
      delivery_method,
      shipping_status = 'Thành công',
      id_order,
      shipping_address
    } = req.body;

    if (!delivery_method || !id_order || !shipping_address) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu thông tin bắt buộc.'
      });
    }

    // 1) tạo shipping
    const newShipping = {
      shipping_date: shipping_date || new Date(),
      delivery_method,
      shipping_status,
      id_order,
      shipping_address
    };
    const shippingData = await new Promise((r, j) =>
      Shipping.create(newShipping, (e, d) => e ? j(e) : r(d))
    );

    // 2) cập nhật order sang Hoàn thành
    await new Promise((r, j) =>
      Shipping.updateOrderStatusToCompleted(id_order, e => e ? j(e) : r())
    );

    // 3) lấy thông tin đơn và chi tiết sản phẩm
    const orderInfo = await new Promise((r, j) =>
      Order.findById(id_order, (e, d) => e ? j(e) : r(d))
    );
    const items = await new Promise((r, j) =>
      OrderDetail.findByOrderId(id_order, (e, rows) => e ? j(e) : r(rows))
    );

    // 4) build HTML cho danh sách sản phẩm và tính subtotal
    let subtotal = 0;
    const itemsHtml = items.map(i => {
      const sub = Number(i.subtotalprice) || 0;
      subtotal += sub;
      return `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">
            ${i.product_name} × ${i.quantity}
          </td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">
            ${sub.toLocaleString('vi-VN')} VND
          </td>
        </tr>`;
    }).join('');

    // 5) Tính giảm giá dựa vào voucher_value (phần trăm)
    const voucherValue = parseInt(orderInfo.voucher_value) || 0;
    let discountAmount = 0;
    if (voucherValue > 0 && subtotal > 0) {
      discountAmount = Math.floor(subtotal * voucherValue / 100);
    }

    // 6) Tổng tiền sau khi trừ giảm
    const totalAfter = subtotal - discountAmount;
    const formattedTotal = totalAfter.toLocaleString('vi-VN') + ' VND';

    // 7) sinh mã + format ngày giao hàng
    const orderCode  = generateCode(id_order, 7919);
    const dateStr    = formatDateTime(shippingData.shipping_date);

    // 8) template email với phần hiển thị “Giảm giá” và tô đỏ "Tổng tiền"
    const html = `
  <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;">
      <div style="background:#007bff;color:#fff;text-align:center;padding:20px;font-size:28px;">
        VTVT Store
      </div>
      <div style="padding:20px;color:#333;line-height:1.5;font-size:16px;">
        <p style="font-size:18px;">Xin chào <strong>${orderInfo.fullname}</strong>,</p>
        
        <p style="font-size:16px;"><strong>Mã đơn hàng:</strong>
          <a href="#" style="color:#007bff;text-decoration:none;font-size:16px;">${orderCode}</a>
        </p>

        <!-- Hiển thị ngày giao hàng -->
        <p style="font-size:16px;margin-bottom:16px;"><strong>Ngày giao hàng:</strong> ${dateStr}</p>

        <h4 style="font-size:20px;margin-top:24px;margin-bottom:8px;color:#555;">Thông tin giao hàng:</h4>
        <p style="margin:4px 0;font-size:16px;"><strong>Địa chỉ:</strong> ${shipping_address}</p>
        <p style="margin:4px 0;font-size:16px;"><strong>SĐT:</strong> ${orderInfo.phone}</p>
        <p style="margin:4px 0;font-size:16px;"><strong>Phương thức thanh toán:</strong> ${orderInfo.payment_method}</p>

        <h4 style="font-size:20px;margin-top:24px;margin-bottom:8px;color:#555;">Chi tiết đơn hàng:</h4>
        <table style="width:100%;border-collapse:collapse;font-size:16px;">
          <thead>
            <tr>
              <th style="text-align:left;padding:8px;border-bottom:2px solid #ddd;font-size:16px;">Sản phẩm</th>
              <th style="text-align:right;padding:8px;border-bottom:2px solid #ddd;font-size:16px;">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <!-- Dòng giảm giá nếu có -->
            ${discountAmount > 0 ? `
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;font-size:16px;">
                <strong>Giảm giá</strong>
              </td>
              <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;color:red;font-weight:bold;font-size:16px;">
                - ${discountAmount.toLocaleString('vi-VN')} VND
              </td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;font-size:16px;"><strong>Phí vận chuyển</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;font-size:16px;">0 VND</td>
            </tr>
          </tbody>
        </table>

        <p style="text-align:right;font-size:28px;font-weight:bold;color:red;margin-top:12px;">
          Tổng tiền: ${formattedTotal}
        </p>

        <p style="text-align:center;color:#777;font-size:16px;margin-top:24px;">
          Cảm ơn bạn đã mua hàng tại VTVT Store!
        </p>
      </div>
    </div>
  </div>
`;

    // 9) gửi mail
    await transporter.sendMail({
      from: `"VTVT Store" <${process.env.EMAIL_USER}>`,
      to: orderInfo.email,
      subject: `Đơn hàng ${orderCode} đang được giao`,
      html
    });

    // 10) trả về client
    return res.status(201).json({
      success: true,
      message: 'Email thông báo đơn hàng đã được gửi thành công.'
    });

  } catch(err) {
    console.error('createShippingAndSendEmail error:', err);
    return res.status(500).json({
      success: false,
      message: 'Có lỗi khi gửi email thông báo.',
      error: err.message
    });
  }
};

//Cập nhật thông tin vận chuyển
const updateShippingById = (req, res) => {
  const id = req.params.id;
  const { shipping_date, delivery_method, shipping_status, id_customer, id_order, shipping_address } = req.body;

  if (!shipping_date || !delivery_method || !shipping_status || !id_customer || !id_order || !shipping_address) {
    return res.status(400).render("error", { message: "Thiếu thông tin để cập nhật vận chuyển." });
  }

  const updatedShipping = new Shipping({ shipping_date, delivery_method, shipping_status, id_customer, id_order, shipping_address });

  Shipping.updateById(id, updatedShipping, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy vận chuyển với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: "Lỗi khi cập nhật vận chuyển." });
      }
    } else {
      res.redirect("/shippings");
    }
  });
};

const deleteShippingById = (req, res) => {
  const id = req.params.id;

  Shipping.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy vận chuyển với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: "Lỗi khi xoá vận chuyển." });
      }
    } else {
      res.redirect("/shippings");
    }
  });
};

module.exports = {
  createShippingAndSendEmail,
  getShippingById,
  getAllShipping,
  updateShippingById,
  deleteShippingById,
};
