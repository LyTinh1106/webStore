const sql = require('../config/database');

const Order = function(order) {
  this.created_at = order.created_at;
  this.payment_method = order.payment_method;
  this.status = order.status;
  this.product_id = order.product_id;
  this.account_id = order.account_id;
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


Order.getAll = (result) => {
  sql.query("SELECT * FROM order_table", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};


Order.updateById = (id, order, result) => {
  sql.query(
    "UPDATE order_table SET created_at = ?, payment_method = ?, status = ?, product_id = ?, account_id = ? WHERE id = ?",
    [order.created_at, order.payment_method, order.status, order.product_id, order.account_id, id],
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
