const sql = require('../config/database');

const Customer = function(customer) {
  this.first_name = customer.first_name;
  this.last_name = customer.last_name;
  this.gender = customer.gender;
  this.email = customer.email;
  this.phone = customer.phone;
  this.address = customer.address;
};

// Thêm mới customer
Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newCustomer });
  });
};

// Lấy customer theo ID
Customer.findById = (id, result) => {
  sql.query("SELECT * FROM customer WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

// Lấy tất cả customers (tuỳ chọn lọc theo tên hoặc email)
Customer.getAll = (search, result) => {
  let query = "SELECT * FROM customer";
  let params = [];

  if (search) {
    query += " WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?";
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  sql.query(query, params, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

// Cập nhật customer theo ID
Customer.updateById = (id, customer, result) => {
  sql.query(
    `UPDATE customer SET 
      first_name = ?, 
      last_name = ?, 
      gender = ?, 
      email = ?, 
      phone = ?, 
      address = ? 
    WHERE id = ?`,
    [
      customer.first_name,
      customer.last_name,
      customer.gender,
      customer.email,
      customer.phone,
      customer.address,
      id
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...customer });
    }
  );
};

// Xoá customer theo ID
Customer.remove = (id, result) => {
  sql.query("DELETE FROM customer WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Customer;
