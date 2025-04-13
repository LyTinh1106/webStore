const sql = require('../config/database');

const Shipping = function (shipping) {
  this.shipping_date = shipping.shipping_date;
  this.delivery_method = shipping.delivery_method;
  this.shipping_status = shipping.shipping_status;
  this.id_customer = shipping.id_customer;
  this.id_order = shipping.id_order;
  this.shipping_address = shipping.shipping_address;
};


Shipping.create = (newShipping, result) => {
  sql.query("INSERT INTO shipping SET ?", newShipping, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created shipping: ", { id: res.insertId, ...newShipping });
    result(null, { id: res.insertId, ...newShipping });
  });
};

// Lấy shipping theo ID
Shipping.findById = (id, result) => {
  sql.query("SELECT * FROM shipping WHERE id = ?", [id], (err, res) => {
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

// Lấy tất cả shipping
Shipping.getAll = (result) => {
  sql.query("SELECT * FROM shipping", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

// Cập nhật thông tin shipping theo ID
Shipping.updateById = (id, shipping, result) => {
  sql.query(
    `UPDATE shipping 
     SET shipping_date = ?, delivery_method = ?, shipping_status = ?, 
         id_customer = ?, id_order = ?, shipping_address = ?
     WHERE id = ?`,
    [
      shipping.shipping_date,
      shipping.delivery_method,
      shipping.shipping_status,
      shipping.id_customer,
      shipping.id_order,
      shipping.shipping_address,
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

      result(null, { id: id, ...shipping });
    }
  );
};

// Xóa shipping theo ID
Shipping.remove = (id, result) => {
  sql.query("DELETE FROM shipping WHERE id = ?", [id], (err, res) => {
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

module.exports = Shipping;
