const Account = require("../models/AccountModel");
const bcrypt = require("bcrypt");
const Category = require('../models/CategoryModel')
const saltRounds = 10;

const getHomePage = (req, res) => {
    res.render('HomePage', { user: req.user || null });
  };

const getRegister = (req, res) => {
  res.render('register');
};
const getLogin = (req, res) => {
    res.render('login');
  };
  const getDashboard = (req, res) => {
    
    if (req.session.user.role !== 'admin') {
      return res.redirect('/homepage?error=Truy cập bị từ chối');
    }
  
    Account.getAll(null, (err, accounts) => {
      if (err) {
        return res.status(500).render('error', { message: 'Lỗi khi lấy danh sách tài khoản' });
      }
  
      Category.getAll((err, categories) => {
        if (err) {
          return res.status(500).render('error', { message: 'Lỗi khi lấy danh sách danh mục' });
        }
  
        res.render('dashboard', { accounts, categories, user: req.session.user });
      });
    });
  };
  
 
  


const create = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).send({ message: "Email, password và role là bắt buộc." });
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
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).send({ message: "Email, password và role là bắt buộc." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updatedAccount = {
      email,
      password: hashedPassword,
      role,
    };

    Account.updateById(req.params.id, updatedAccount, (err, data) => {
      if (err) {
        if (err.kind === "not_found") return res.status(404).send({ message: `Không tìm thấy account với id ${req.params.id}` });
        return res.status(500).send({ message: `Lỗi khi cập nhật account với id ${req.params.id}` });
      }
      res.send(data);
    });
  } catch (err) {
    res.status(500).send({ message: "Lỗi mã hoá mật khẩu khi cập nhật." });
  }
};

const remove = (req, res) => {
  const id = req.params.id;

  Account.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") return res.status(404).send({ message: `Không tìm thấy account với id ${id}` });
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
// dang ki
const register = async (req, res) => {
    const { email, password, confirmpassword } = req.body;
  
    if (!email || !password || !confirmpassword) {
      return res.status(400).render("register", { message: "Vui lòng điền đầy đủ thông tin." });
    }
  
    if (password !== confirmpassword) {
      return res.status(400).render("register", { message: "Mật khẩu không khớp." });
    }
  
    try {
      Account.findByEmail(email, async (err, existingAccount) => {
        if (existingAccount) {
          return res.status(400).render("register", { message: "Email đã được sử dụng." });
        }
  
        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        const newAccount = {
          email,
          password: hashedPassword,
          role: "customer", h
        };
  
        Account.create(newAccount, (err, data) => {
          if (err) return res.status(500).render("register", { message: "Đăng ký thất bại." });
  
          req.session.user = {
            id: data.id,
            email: data.email,
            role: data.role,
          };
  
          
          if (data.role === "admin") {
            return res.redirect("/dashboard");
          } else {
            return res.redirect("/homepage");
          }
        });
      });
    } catch (error) {
      res.status(500).render("register", { message: "Đã xảy ra lỗi trong quá trình đăng ký." });
    }
  };
  
  
  // dang nhap
  const login = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).render("login", { message: "Vui lòng điền đầy đủ email và mật khẩu." });
    }
  
    Account.findByEmail(email, async (err, account) => {
      if (err || !account) {
        return res.status(401).render("login", { message: "Email không tồn tại." });
      }
  
      const isMatch = await bcrypt.compare(password, account.password);
  
      if (!isMatch) {
        return res.status(401).render("login", { message: "Mật khẩu không đúng." });
      }
  
      req.session.user = {
        id: account.id,
        email: account.email,
        role: account.role,
      };
  
      
      if (account.role === "admin") {
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
  register,
  login
};
