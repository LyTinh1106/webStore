const sql = require("../config/database");

const OrderDetail = function(orderDetail) {
  this.order_id = orderDetail.order_id;
  this.product_id = orderDetail.product_id;
  this.quantity = orderDetail.quantity;
  this.subtotalprice = orderDetail.subtotalprice;
};


OrderDetail.create = (newDetail, result) => {
  sql.query("INSERT INTO order_detail SET ?", newDetail, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { ...newDetail });
  });
};


OrderDetail.findByOrderId = (orderId, result) => {
  const query = `
    SELECT od.*, p.name AS product_name 
    FROM order_detail od
    JOIN product p ON od.product_id = p.id
    WHERE od.order_id = ?
  `;

  sql.query(query, [orderId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};



OrderDetail.getAll = (result) => {
  sql.query("SELECT * FROM order_detail", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

OrderDetail.update = (orderId, productId, detail, result) => {
  sql.query(
    "UPDATE order_detail SET quantity = ?, subtotalprice = ? WHERE order_id = ? AND product_id = ?",
    [detail.quantity, detail.subtotalprice, orderId, productId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { order_id: orderId, product_id: productId, ...detail });
    }
  );
};

OrderDetail.remove = (orderId, productId, result) => {
  sql.query(
    "DELETE FROM order_detail WHERE order_id = ? AND product_id = ?",
    [orderId, productId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res);
    }
  );
};



OrderDetail.findBasicId = (orderId, result) => {
  const query = `
    SELECT od.quantity, od.subtotalprice, p.name as product_name
    FROM order_detail od
    JOIN product p ON od.product_id = p.id
    WHERE od.order_id = ?
  `;
  sql.query(query, [orderId], (err, res) => {
    if (err) return result(err, null);
    result(null, res);
  });
};

module.exports = OrderDetail;
