const Customer = require("../models/CustomerModel");

// Tạo mới customer
const createCustomer = (req, res) => {
  const { first_name, last_name, gender, email, phone, address } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).json({ message: "First name, last name và email là bắt buộc." });
  }

  const newCustomer = new Customer({ first_name, last_name, gender, email, phone, address });

  Customer.create(newCustomer, (err, data) => {
    if (err)
      return res.status(500).json({ message: err.message || "Lỗi khi tạo customer." });

    res.status(201).json({ message: "Tạo customer thành công", data });
  });
};

// Lấy tất cả customer (tuỳ chọn search theo tên/email)
const getAllCustomers = (req, res) => {
  const search = req.query.search || null;

  Customer.getAll(search, (err, data) => {
    if (err)
      return res.status(500).json({ message: err.message || "Lỗi khi lấy danh sách customer." });

    res.status(200).json({ message: "ok", data });
  });
};

// Lấy customer theo ID
const getCustomerById = (req, res) => {
  Customer.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        return res.status(404).json({ message: "Customer không tồn tại." });

      return res.status(500).json({ message: "Lỗi khi tìm customer." });
    }

    res.status(200).json({ message: "ok", data });
  });
};

// Cập nhật customer
const updateCustomer = (req, res) => {
  const { first_name, last_name, gender, email, phone, address } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).json({ message: "First name, last name và email là bắt buộc." });
  }

  const updatedCustomer = {
    first_name,
    last_name,
    gender,
    email,
    phone,
    address,
  };

  Customer.updateById(req.params.id, updatedCustomer, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        return res.status(404).json({ message: "Customer không tồn tại." });

      return res.status(500).json({ message: "Lỗi khi cập nhật customer." });
    }

    res.status(200).json({ message: "Cập nhật customer thành công", data });
  });
};

// Xoá customer
const deleteCustomer = (req, res) => {
  Customer.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        return res.status(404).json({ message: "Customer không tồn tại." });

      return res.status(500).json({ message: "Không thể xoá customer." });
    }

    res.status(200).json({ message: "Xoá customer thành công" });
  });
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
