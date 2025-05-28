const Shipping = require("../models/ShippingModel");
const nodemailer = require('nodemailer');
const Customer    = require('../models/CustomerModel');
const OrderDetail = require('../models/OrderDetailModel');
const Order = require("../models/OrderModel");


const getAllShipping = (req, res) => {
  Shipping.getAll((err, data) => {
    if (err) {
      res.status(500).render("error", { message: err.message || "Đã xảy ra lỗi khi lấy danh sách vận chuyển." });
    } else {
      res.render("shippingDashboard", { shippings: data });
    }
  });
};

const getShippingById = (req, res) => {
  const id = req.params.id;
  Shipping.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy thông tin vận chuyển với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: `Lỗi truy xuất thông tin vận chuyển với ID ${id}.` });
      }
    } else {
      res.render("shippingDashboard", { shipping: data, mode: "edit" });
    }
  });
};



const formatDateTime = date => {
  const d = new Date(date);
  const pad = n => String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
       + ` ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const generateCode = (id, multiplier) => {
  const rand = ('0000' + (id * multiplier % 10000)).slice(-4);
  return `#${rand}${id}`;
};

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
      id_customer,
      id_order,
      shipping_address
    } = req.body;

    if (!delivery_method || !id_customer || !id_order || !shipping_address) {
      return res.status(400).json({ success:false, message:'Thiếu thông tin.' });
    }

    // Tạo và cập nhật...
    const newShipping = { shipping_date: shipping_date||new Date(), delivery_method, shipping_status, id_customer, id_order, shipping_address };
    const shippingData = await new Promise((r,j) => Shipping.create(newShipping, (e,d)=> e?j(e):r(d)));
    await new Promise((r,j)=> Shipping.updateOrderStatusToCompleted(id_order, e=> e? j(e):r()));

    // Lấy order + details
    const orderInfo = await new Promise((r,j)=> Order.findById(id_order,(e,d)=> e?j(e):r(d)));
    const items     = await new Promise((r,j)=> OrderDetail.findByOrderId(id_order,(e,rows)=> e?j(e):r(rows)));

    // Build danh sách sản phẩm + tính tổng
    let totalAll = 0;
    const itemsHtml = items.map(i=>{
      const sub = Number(i.subtotalprice)||0;
      totalAll += sub;
      return `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">${i.product_name} × ${i.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${sub.toLocaleString('vi-VN')} VND</td>
        </tr>`;
    }).join('');
    const formattedTotal = totalAll.toLocaleString('vi-VN') + ' VND';

    // Mã & ngày
    const shippingCode = generateCode(shippingData.id,2027);
    const orderCode    = generateCode(id_order,7919);
    const dateStr      = formatDateTime(shippingData.shipping_date);

    // HTML email
  const html = `
  <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;">
      <div style="background:#007bff;color:#fff;text-align:center;padding:20px;font-size:28px;">
        VTVT Store
      </div>
      <div style="padding:20px;color:#333;line-height:1.5;font-size:16px;">
        <p style="font-size:18px;">Xin chào <strong>${orderInfo.fullname}</strong>,</p>
        <p style="font-size:16px;">Bạn đã đặt hàng thành công tại <strong>VTVT Store</strong>.</p>

        <p style="font-size:16px;"><strong>Mã đơn hàng:</strong>
          <a href="#" style="color:#007bff;text-decoration:none;font-size:16px;">${orderCode}</a>
        </p>

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
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;font-size:16px;"><strong>Phí vận chuyển</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;font-size:16px;">0 VND</td>
            </tr>
          </tbody>
        </table>

        <p style="text-align:right;font-size:18px;font-weight:bold;margin-top:12px;">
          Tổng tiền: ${formattedTotal}
        </p>

        <p style="text-align:center;color:#777;font-size:16px;margin-top:24px;">
          Cảm ơn bạn đã mua hàng tại VTVT Store!
        </p>
      </div>
    </div>
  </div>
`;


    // Gửi mail
    transporter.sendMail({
      from: `"VTVT Store" <${process.env.EMAIL_USER}>`,
      to: orderInfo.email,
      subject: `Đơn hàng ${orderCode} đang được giao`,
      html
    },(err,info)=>{
      if(err) console.error('Lỗi gửi mail:',err);
      else console.log('Mail đã gửi:',info.response);
    });

    // Kết quả
    return res.status(201).json({
      success:true,
      message:'Tạo đơn giao hàng & gửi mail thành công.',
      shipping:shippingData
    });

  } catch(err) {
    console.error(err);
    return res.status(500).json({
      success:false,
      message:'Lỗi khi tạo đơn giao hàng.',
      error:err.message
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



// 👉 Export toàn bộ
module.exports = {
  createShippingAndSendEmail,
  getShippingById,
  getAllShipping,
  updateShippingById,
  deleteShippingById,
};
