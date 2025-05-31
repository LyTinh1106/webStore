const Account = require("../models/AccountModel");
const bcrypt = require("bcrypt");
const Category = require('../models/CategoryModel')
const Brand = require('../models/BrandModel')
const Product = require('../models/ProductModel');
const Order = require('../models/OrderModel')
const Customer = require('../models/CustomerModel')
const OrderDetail = require('../models/OrderDetailModel')
const Shipping = require('../models/ShippingModel')
const Supplier = require('../models/SupplierModel')
const Voucher = require('../models/VoucherModel')

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { get } = require("../routes/order");


const saltRounds = 10;

// const getHomePage = (req, res) => {
//   const user = req.user || req.session.user || null;

//   Product.getAll(null, (err, products) => {
//     if (err) {
//       return res.status(500).render("error", { message: "Lỗi khi lấy danh sách sản phẩm." });
//     }

//     if (!user || !user.email) {
//       // Nếu chưa đăng nhập, không cần tìm customer
//       return res.render('HomePage', {
//         user: null,
//         customer: null,
//         products
//       });
//     }

//     // Lấy thông tin họ tên nếu có
//     Customer.getByEmail(user.email, (errCustomer, customerInfo) => {
//       if (errCustomer && errCustomer.kind !== "not_found") {
//         return res.status(500).render("error", { message: "Lỗi khi lấy thông tin khách hàng." });
//       }

//       res.render('HomePage', {
//         user,
//         customer: customerInfo || null,
//         products
//       });
//     });
//   });
// };

const getHomePage = (req, res) => {
  const user = req.user || req.session.user || null;

  // Lấy mảng viewed_product_ids từ cookie
  let viewedIds = [];
  try {
    viewedIds = JSON.parse(req.cookies.viewed_product_ids || '[]');
  } catch (e) {
    viewedIds = [];
  }

  Product.getAll(null, (err, products) => {
    if (err) {
      return res.status(500).render("error", { message: "Lỗi khi lấy danh sách sản phẩm." });
    }

    // Hàm render trang chủ (render khi đủ dữ liệu)
    const renderHome = (customerInfo, viewedProducts) => {
      res.render('HomePage', {
        user: user || null,
        customer: customerInfo || null,
        products,
        viewedProducts: viewedProducts || [] // truyền vào template
      });
    };

    // Nếu chưa đăng nhập, không cần tìm customer
    if (!user || !user.email) {
      // Nếu không có id xem gần đây thì trả luôn mảng rỗng
      if (!viewedIds.length) return renderHome(null, []);
      // Có id thì lấy thông tin sản phẩm đã xem
      Product.findByIds(viewedIds, (err, viewedProducts) => {
        if (err) return renderHome(null, []);
        // Đảm bảo đúng thứ tự cookie
        const sortedViewedProducts = viewedIds.map(id =>
          viewedProducts.find(p => String(p.id) === String(id))
        ).filter(Boolean);
        renderHome(null, sortedViewedProducts);
      });
      return;
    }

    // Nếu có user, lấy thêm thông tin customer và sản phẩm đã xem
    Customer.getByEmail(user.email, (errCustomer, customerInfo) => {
      if (errCustomer && errCustomer.kind !== "not_found") {
        return res.status(500).render("error", { message: "Lỗi khi lấy thông tin khách hàng." });
      }
      if (!viewedIds.length) return renderHome(customerInfo, []);
      Product.findByIds(viewedIds, (err, viewedProducts) => {
        if (err) return renderHome(customerInfo, []);
        const sortedViewedProducts = viewedIds.map(id =>
          viewedProducts.find(p => String(p.id) === String(id))
        ).filter(Boolean);
        renderHome(customerInfo, sortedViewedProducts);
      });
    });
  });
};

const getRegister = (req, res) => {
  res.render('register');
};
const getLogin = (req, res) => {
  res.render("login", { message: null });
};

const getForgotPassword = (req, res) => {
  res.render('forgotPassword', { message: null }); // truyền message mặc định
};
const getResetPassword = (req, res) => {
  const token = req.query.token;
  res.render('resetPassword', { token, message: null });
};
const getSuccess = (req, res) => {
  const user = req.user || req.session.user || null;

  if (!user || !user.email) {
    return res.render('order-success', {
      user: null,
      customer: null
    });
  }
  Customer.getByEmail(user.email, (errCustomer, customerInfo) => {
    if (errCustomer && errCustomer.kind !== "not_found") {
      return res.status(500).render("error", {
        message: "Lỗi khi lấy thông tin khách hàng."
      });
    }
    res.render('order-success', {
      user,
      customer: customerInfo || null
    });
  });
};


const getInfo = (req, res) => {
  const user = req.user || req.session.user || null;
  const account_id = user?.id;

  if (!user || !user.email) {
    return res.status(400).send("Không tìm thấy thông tin người dùng hoặc email.");
  }

  Order.findByAccountId(account_id, (err, orders) => {
    const orderList = (err && err.kind === "not_found") ? [] : orders;

    if (err && err.kind !== "not_found") {
      return res.status(500).send("Đã xảy ra lỗi khi truy xuất đơn hàng.");
    }

    Customer.getByEmail(user.email, (errCustomer, customerInfo) => {

      if (errCustomer && errCustomer.kind !== "not_found") {
        return res.status(500).send("Đã xảy ra lỗi khi truy xuất thông tin khách hàng.");
      }

      res.render("userInfo", {
        user: user,
        orders: orderList || [],
        customer: customerInfo || null,
        message: (orderList.length === 0 ? "Không tìm thấy đơn hàng nào." : null)
      });
    });
  });
};

const getLastViewProducts = (req, res) => {
  const user = req.user || req.session.user || null;
  const email = user ? user.email : null;
  let viewedIds = [];
  try {
    viewedIds = JSON.parse(req.cookies.viewed_product_ids || '[]');
  } catch (e) {
    viewedIds = [];
  }

  if (!email) {
    return res.render('lastViewProducts', {
      user,
      customer: null,
      products: [],
      message: "Vui lòng đăng nhập để xem lịch sử sản phẩm đã xem."
    });
  }

  Customer.getByEmail(email, (err, customer) => {
    if (err || !customer) {
      return res.render('lastViewProducts', {
        user,
        customer: null,
        products: [],
        message: "Không tìm thấy thông tin khách hàng."
      });
    }

    if (!viewedIds.length) {
      return res.render('lastViewProducts', {
        user,
        customer,
        products: [],
        message: "Chưa có sản phẩm nào được xem gần đây."
      });
    }

    Product.findByIds(viewedIds, (err, products) => {
      if (err || !products) {
        return res.render('lastViewProducts', {
          user,
          customer,
          products: [],
          message: "Không tìm thấy sản phẩm."
        });
      }

      // Đảm bảo đúng thứ tự lịch sử xem
      const sortedProducts = viewedIds.map(id => products.find(p => String(p.id) === String(id))).filter(Boolean);

      res.render('lastViewProducts', {
        user,
        customer,
        products: sortedProducts,
        message: null
      });
    });
  });
};



const getDashboard = (req, res) => {
  if (!req.session.user || (req.session.user.role !== 'admin' && req.session.user.role !== 'superadmin')) {
    return res.redirect('/homepage?error=Truy+c%E1%BA%ADp+b%E1%BB%8B+t%E1%BB%AB+ch%E1%BB%91i');
  }

  Account.getAll(null, req.session.user.role, (err, accounts) => {
    if (err) return res.status(500).render('error', { message: 'Lỗi khi lấy danh sách tài khoản' });

    Category.getAll((err, categories) => {
      if (err) return res.status(500).render('error', { message: 'Lỗi khi lấy danh sách danh mục' });

      Brand.getAll((err, brands) => {
        if (err) return res.status(500).render('error', { message: 'Lỗi khi lấy danh sách nhãn hàng' });

        Product.getAll(null, (err, products) => {
          if (err) return res.status(500).render('error', { message: 'Lỗi khi lấy danh sách sản phẩm' });

          Order.getAll((err, orders) => {
            if (err) return res.status(500).render('error', { message: 'Lỗi khi lấy danh sách đơn hàng' });

            Shipping.getAll((err, shippings) => {
              if (err) return res.status(500).render('error', { message: 'Lỗi khi lấy danh sách vận chuyển' });

              Supplier.getAll((err, suppliers) => {
                if (err) return res.status(500).render('error', { message: 'Lỗi khi lấy danh sách nhà cung cấp' });

                Voucher.getAll(null, (err, vouchers) => {
                  if (err) return res.status(500).render('error', { message: 'Lỗi khi lấy danh sách voucher' });

                  Order.GetExistingYear((err, years) => {
                    if (err) return res.status(500).render('error', { message: 'Lỗi khi lấy danh sách năm đơn hàng' });

                    Order.GetStats((err, statsData) => {
                      if (err) return res.status(500).render('error', { message: 'Lỗi khi lấy thống kê tổng quan' });

                      const stats = statsData[0];

                      res.render('dashboard', {
                        user: req.session.user,
                        accounts,
                        categories,
                        brands,
                        products,
                        orders,
                        shippings,
                        suppliers,
                        vouchers,
                        years, // truyền biến này sang EJS
                        stats
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

module.exports = { getDashboard };

//Forgot password
const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Sử dụng model thay vì db.query trực tiếp
    Account.findByEmail(email, (err, account) => {
      if (err || !account) {
        return res.status(404).json({ message: "Email không tồn tại" });
      }

      // Tạo JWT token
      const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
      const resetLink = `http://localhost:9000/reset-password?token=${token}`;


      // Cấu hình Gmail
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Đặt lại mật khẩu',
        html: `
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: 1px solid #e0e0e0;">
  <tr>
    <td style="background-color: #4a90e2; height: 10px; line-height: 10px; font-size: 0;">&nbsp;</td>
  </tr>
  <tr>
    <td style="background-color: #f8f9fa; padding: 30px 25px; text-align: center;">
      <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 22px; font-weight: bold;">Đặt lại mật khẩu</h2>
      <p style="color: #505050; font-size: 16px; margin: 0 0 20px 0;">Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
      <p style="color: #505050; font-size: 16px; margin: 0 0 25px 0;">Vui lòng nhấp vào nút bên dưới để tiếp tục:</p>
      <div style="margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #4a90e2; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; font-size: 16px;">Đặt lại mật khẩu</a>
      </div>
      <p style="color: #e74c3c; font-size: 15px; margin: 25px 0;">
        <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-clock-outline-512.png" width="18" height="18" style="vertical-align: middle; margin-right: 5px;" alt="Clock">
        Liên kết có hiệu lực trong <strong>1 giờ</strong>
      </p>
      <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 4px; padding: 15px; margin: 25px 0; text-align: left;">
        <p style="color: #505050; font-size: 14px; margin: 0 0 5px 0;">Nếu nút không hoạt động, vui lòng sao chép và dán URL sau vào trình duyệt:</p>
        <a href="${resetLink}" style="word-break: break-all; color: #4a90e2; font-size: 14px;">${resetLink}</a>
      </div>
      <p style="color: #7f8c8d; font-size: 14px; margin: 20px 0 0 0; padding-top: 20px; border-top: 1px solid #e0e0e0;">Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này hoặc liên hệ hỗ trợ ngay.</p>
    </td>
  </tr>
</table>
          `,
      };

      // Gửi email và kiểm tra lỗi
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: "Lỗi khi gửi email" });
        }
        res.send('123')
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

//reset pass
const resetPassword = async (req, res) => {
  const { email, newPassword, token } = req.body;

  if (!email || !newPassword || !token) {
    return res.render("resetPassword", {
      token: null,
      message: "Thiếu thông tin đầu vào.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    Account.updatePasswordByEmail(email, hashedPassword, (err, result) => {
      if (err) {
        return res.render("resetPassword", {
          token: null,
          message: "Lỗi khi cập nhật mật khẩu.",
        });
      }

      req.session.successMessage = "Đặt lại mật khẩu thành công.";
      return res.redirect("/login");
    });
  } catch (err) {
    return res.render("resetPassword", {
      token: null,
      message: "Token không hợp lệ hoặc đã hết hạn.",
    });
  }
};



//verify
const verifyResetToken = (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    // Nếu hợp lệ, render form đặt lại mật khẩu
    res.render('reset-password', { token, error: null });
  } catch (err) {
    // Token không hợp lệ hoặc hết hạn
    res.render('reset-password', { token: null, error: 'Token không hợp lệ.' });
  }
};





const create = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).send({ message: "Email, password và role là bắt buộc." });
  }

  // Chỉ cho phép superadmin tạo tài khoản admin
  if (!req.session.user || req.session.user.role !== 'superadmin') {
    return res.status(403).send({ message: "Chỉ superadmin mới được tạo tài khoản." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const account = {
      email,
      password: hashedPassword,
      role,
    };

    Account.create(account, (err, data) => {
      if (err) return res.status(500).send({ message: err.message || "Lỗi tạo account." });
      res.send(data);
    });
  } catch (err) {
    res.status(500).send({ message: "Lỗi mã hoá mật khẩu." });
  }
};


const findAll = (req, res) => {
  const email = req.query.email;

  Account.getAll(email, (err, data) => {
    if (err) return res.status(500).send({ message: err.message || "Lỗi khi lấy danh sách account." });
    res.send(data);
  });
};

const findOne = (req, res) => {
  const id = req.params.id;

  Account.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") return res.status(404).send({ message: `Không tìm thấy account với id ${id}.` });
      return res.status(500).send({ message: `Lỗi khi tìm account với id ${id}` });
    }
    res.send(data);
  });
};

const findByEmail = (req, res) => {
  const email = req.params.email;

  Account.findByEmail(email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") return res.status(404).send({ message: `Không tìm thấy account với email ${email}.` });
      return res.status(500).send({ message: `Lỗi khi tìm account với email ${email}` });
    }
    res.send(data);
  });
};

const update = async (req, res) => {
  // ➔ Chỉ superadmin được phép sửa
  if (!req.session.user || req.session.user.role !== 'superadmin') {
    return res.status(403).send({ message: 'Chỉ superadmin mới được phép sửa tài khoản.' });
  }

  const { email, password, role } = req.body;

  if (!email || !role) {
    return res.status(400).send({ message: "Email và role là bắt buộc." });
  }

  try {
    const updatedAccount = { email, role };

    // Chỉ hash và thêm mật khẩu nếu có gửi lên
    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updatedAccount.password = hashedPassword;
    }

    Account.updateById(req.params.id, updatedAccount, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({ message: `Không tìm thấy account với id ${req.params.id}` });
        }
        if (err.kind === "forbidden_superadmin_change") {
          return res.status(403).send({ message: "Không thể thay đổi role của superadmin." });
        }
        return res.status(500).send({ message: `Lỗi khi cập nhật account với id ${req.params.id}` });
      }
      res.send(data);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Lỗi server khi cập nhật." });
  }
};



const remove = (req, res) => {
  // ➔ Chỉ superadmin được phép xóa
  if (!req.session.user || req.session.user.role !== 'superadmin') {
    return res.status(403).send({ message: 'Chỉ superadmin mới được phép xóa tài khoản.' });
  }

  const id = req.params.id;

  Account.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({ message: `Không tìm thấy account với id ${id}` });
      }
      if (err.kind === "forbidden_superadmin") {
        return res.status(403).send({ message: "Không thể xoá superadmin." });
      }
      return res.status(500).send({ message: `Không thể xoá account với id ${id}` });
    }

    res.send({ message: "Xoá account thành công." });
  });
};



const isAdmin = (req, res) => {
  const email = req.params.email;

  Account.isAdmin(email, (err, isAdmin) => {
    if (err) return res.status(500).send({ message: `Lỗi kiểm tra role cho email ${email}` });
    res.send({ isAdmin });
  });
};
//Đăng kí tài khoản có  OTP
const register = async (req, res) => {
  const { email, password, confirmpassword, agreeTerms } = req.body;

  if (!email || !password || !confirmpassword || !agreeTerms) {
    return res.status(400).render("register", { message: "Vui lòng điền đầy đủ thông tin." });
  }

  if (password !== confirmpassword) {
    return res.status(400).render("register", { message: "Mật khẩu không khớp." });
  }

  if (!agreeTerms) {
    return res.status(400).render("register", { message: "Bạn cần đồng ý với điều khoản dịch vụ." });
  }

  try {
    Account.findByEmail(email, async (err, existingAccount) => {
      if (existingAccount) {
        return res.status(400).render("register", { message: "Email đã được sử dụng." });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // ✅ Lưu tạm tài khoản vào session thay vì lưu vào DB ngay
      req.session.pendingAccount = {
        email,
        password: hashedPassword,
        role: "customer"
      };

      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpExpires = Date.now() + 5 * 60 * 1000; // 5 phút

      req.session.otp = otp;
      req.session.otpExpires = otpExpires;
      req.session.otpEmail = email;

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Mã OTP xác minh tài khoản",
        html: `
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;border-collapse:collapse;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);border:1px solid #e0e0e0;">
  <tr>
    <td style="background-color:#4a90e2;height:10px;line-height:10px;font-size:0;"></td>
  </tr>
  <tr>
    <td style="background-color:#f8f9fa;padding:30px 25px;text-align:center;">
      <h2 style="color:#2c3e50;margin:0 0 20px 0;font-size:22px;font-weight:bold;">Xác thực bảo mật tài khoản</h2>
      <p style="color:#505050;font-size:16px;margin:0 0 25px 0;">Vui lòng sử dụng mã OTP sau đây để hoàn tất quá trình xác thực:</p>
      <div style="background-color:#fff;border-radius:6px;padding:15px 20px;display:inline-block;margin:0 auto 18px auto;border:1px solid #e0e0e0;">
        <span style="font-size:36px;letter-spacing:5px;color:#4a90e2;font-weight:bold;">${otp}</span>
      </div>
    </td>
  </tr>
  <tr>
    <td style="background-color:#f8f9fa;text-align:center;">
      <p style="color:#e74c3c;font-size:15px;margin:10px 0 10px 0;">
        <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-clock-outline-512.png" width="18" height="18" style="vertical-align:middle;margin-right:5px;" alt="Clock">
        Mã có hiệu lực trong <strong>5 phút</strong>
      </p>
    </td>
  </tr>
  <tr>
    <td style="background-color:#f8f9fa;padding:0 25px 30px 25px;text-align:center;">
      <p style="color:#7f8c8d;font-size:14px;margin:20px 0 0 0;padding-top:20px;border-top:1px solid #e0e0e0;">
        Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này hoặc liên hệ hỗ trợ.
      </p>
    </td>
  </tr>
</table>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Lỗi gửi OTP:", error);
          return res.status(500).render("register", { message: "Lỗi khi gửi mã OTP." });
        }
        return res.redirect("/verify-otp");
      });
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    res.status(500).render("register", { message: "Đã xảy ra lỗi trong quá trình đăng ký." });
  }
};

// Hàm xử lý xác minh OTP - tích hợp cả HTML (render) và JSON (fetch)
const verifyOtp = (req, res) => {
  const isJsonRequest = req.headers['content-type'] === 'application/json';
  const userOtp = isJsonRequest ? req.body.otp : req.body.otp;

  if (!req.session.otp || !req.session.otpExpires || !req.session.pendingAccount) {
    const message = "OTP đã hết hạn hoặc không tồn tại.";
    return isJsonRequest
      ? res.json({ success: false, message })
      : res.render("verify-otp", { message });
  }

  if (Date.now() > req.session.otpExpires) {
    const message = "OTP đã hết hạn.";
    return isJsonRequest
      ? res.json({ success: false, message })
      : res.render("verify-otp", { message });
  }

  if (parseInt(userOtp) !== req.session.otp) {
    const message = "OTP không chính xác.";
    return isJsonRequest
      ? res.json({ success: false, message })
      : res.render("verify-otp", { message });
  }

  // Nếu OTP đúng → lưu tài khoản vào DB
  Account.create(req.session.pendingAccount, (err, data) => {
    if (err) {
      const message = "Lỗi khi lưu tài khoản.";
      return isJsonRequest
        ? res.status(500).json({ success: false, message })
        : res.status(500).render("verify-otp", { message });
    }

    delete req.session.otp;
    delete req.session.otpExpires;
    delete req.session.otpEmail;
    delete req.session.pendingAccount;

    return isJsonRequest
      ? res.json({ success: true })
      : res.redirect("/login");
  });
};



// dang nhap
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render("login", {
      message: "Vui lòng điền đầy đủ email và mật khẩu.",
    });
  }

  Account.findByEmail(email, async (err, account) => {
    if (err || !account) {
      return res.status(401).render("login", {
        message: "Tài khoản hoặc mật khẩu không hợp lệ.",
      });
    }

    const isMatch = await bcrypt.compare(password, account.password);

    if (!isMatch) {
      return res.status(401).render("login", {
        message: "Tài khoản hoặc mật khẩu không hợp lệ.",
      });
    }

    req.session.user = {
      id: account.id,
      email: account.email,
      role: account.role,
    };

    if (account.role === "admin" || account.role === "superadmin") {
      return res.redirect("/dashboard");
    } else {
      return res.redirect("/homepage");
    }
  });
};

module.exports = {
  create,
  findAll,
  findOne,
  findByEmail,
  update,
  remove,
  isAdmin,
  getDashboard,
  getHomePage,
  getRegister,
  getLogin,
  getInfo,
  getLastViewProducts,
  register,
  login,
  getForgotPassword,
  getResetPassword,
  sendResetPasswordEmail,
  resetPassword,
  verifyResetToken,
  verifyOtp,
  getSuccess

}
