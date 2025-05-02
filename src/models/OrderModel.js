const sql = require('../config/database');

const Order = function (order) {
  this.created_at = order.created_at;
  this.payment_method = order.payment_method;
  this.order_status = order.order_status;
  this.account_id = order.account_id;
  this.total_payment = order.total_payment
};


Order.create = (newOrder, result) => {
  sql.query("INSERT INTO order_table SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newOrder });
  });
};


Order.findById = (id, result) => {
  sql.query("SELECT * FROM order_table WHERE id = ?", [id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};

Order.findByAccountId = (account_id, result) => {
  sql.query("SELECT o.*, a.email FROM order_table o JOIN account a ON o.account_id = a.id WHERE a.id = ?", [account_id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.length) {
      result(null, res); // Trả về toàn bộ danh sách
    } else {
      result({ kind: "not_found" }, null);
    }
  });

}


Order.getAll = (result) => {
  sql.query("SELECT *, a.email FROM order_table o JOIN account a on o.account_id = a.id", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};


Order.updateById = (id, order, result) => {
  sql.query(
    "UPDATE order_table SET created_at = ?, payment_method = ?, order_status = ?, account_id = ?, total_payment = ? WHERE id = ?",
    [
      order.created_at,
      order.payment_method,
      order.order_status,
      order.account_id,
      order.total_payment,
      id
    ],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id, ...order });
    }
  );
};

Order.remove = (id, result) => {
  sql.query("DELETE FROM order_table WHERE id = ?", [id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Order;
