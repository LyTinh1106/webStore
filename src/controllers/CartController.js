// const Customer = require('../models/CustomerModel');

// // Tạo customer mới
// const createCustomer = (req, res) => {
//   const { first_name, last_name, gender, email, phone, address } = req.body;

//   if (!first_name || !last_name || !gender || !email || !phone || !address) {
//     return res.status(400).json({ message: "Thiếu thông tin khách hàng." });
//   }

//   const newCustomer = new Customer({ first_name, last_name, gender, email, phone, address });

//   Customer.create(newCustomer, (err, data) => {
//     if (err) return res.status(500).json({ message: "Lỗi khi tạo khách hàng." });
//     res.status(201).json({ message: "Tạo khách hàng thành công", data });
//   });
// };

// // Lấy customer theo ID
// const getCustomerById = (req, res) => {
//   Customer.findById(req.params.id, (err, data) => {
//     if (err) return res.status(500).json({ message: "Lỗi khi tìm khách hàng." });
//     if (!data) return res.status(404).json({ message: "Không tìm thấy khách hàng." });
//     res.status(200).json(data);
//   });
// };

// // Lấy tất cả hoặc tìm kiếm theo tên/email
// const getAllCustomers = (req, res) => {
//   const search = req.query.search || null;

//   Customer.getAll(search, (err, data) => {
//     if (err) return res.status(500).json({ message: "Lỗi khi lấy danh sách khách hàng." });
//     res.status(200).json(data);
//   });
// };

// // Cập nhật customer
// const updateCustomer = (req, res) => {
//   const { first_name, last_name, gender, email, phone, address } = req.body;

//   if (!first_name || !last_name || !gender || !email || !phone || !address) {
//     return res.status(400).json({ message: "Thiếu thông tin để cập nhật khách hàng." });
//   }

//   const updatedCustomer = new Customer({ first_name, last_name, gender, email, phone, address });

//   Customer.updateById(req.params.id, updatedCustomer, (err, data) => {
//     if (err) return res.status(500).json({ message: "Lỗi khi cập nhật khách hàng." });
//     if (!data) return res.status(404).json({ message: "Không tìm thấy khách hàng để cập nhật." });
//     res.status(200).json({ message: "Cập nhật khách hàng thành công", data });
//   });
// };

// // Xoá customer
// const deleteCustomer = (req, res) => {
//   Customer.remove(req.params.id, (err, data) => {
//     if (err) return res.status(500).json({ message: "Lỗi khi xoá khách hàng." });
//     if (!data) return res.status(404).json({ message: "Không tìm thấy khách hàng để xoá." });
//     res.status(200).json({ message: "Xoá khách hàng thành công" });
//   });
// };

// module.exports = {
//   createCustomer,
//   getCustomerById,
//   getAllCustomers,
//   updateCustomer,
//   deleteCustomer
// };
