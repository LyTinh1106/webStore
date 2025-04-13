const sql = require("../config/database");

const Cart = function(cart) {
  this.id_customer = cart.id_customer;
  this.id_product = cart.id_product;
  this.quantity = cart.quantity;
};

// Thêm sản phẩm vào giỏ (nếu có rồi thì cập nhật số lượng)
Cart.addOrUpdate = (cart, result) => {
  sql.query(
    `INSERT INTO cart (id_customer, id_product, quantity)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
    [cart.id_customer, cart.id_product, cart.quantity],
    (err, res) => {
      if (err) {
        console.log("Add/Update Cart error: ", err);
        result(err, null);
        return;
      }
      result(null, cart);
    }
  );
};

// Lấy toàn bộ sản phẩm trong giỏ của một khách
Cart.getByCustomerId = (id_customer, result) => {
  sql.query(
    "SELECT * FROM cart WHERE id_customer = ?",
    [id_customer],
    (err, res) => {
      if (err) {
        console.log("Get Cart error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

// Cập nhật số lượng sản phẩm trong giỏ
Cart.updateQuantity = (id_customer, id_product, quantity, result) => {
  sql.query(
    "UPDATE cart SET quantity = ? WHERE id_customer = ? AND id_product = ?",
    [quantity, id_customer, id_product],
    (err, res) => {
      if (err) {
        console.log("Update Cart error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};


Cart.removeItem = (id_customer, id_product, result) => {
  sql.query(
    "DELETE FROM cart WHERE id_customer = ? AND id_product = ?",
    [id_customer, id_product],
    (err, res) => {
      if (err) {
        console.log("Remove Cart Item error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};


Cart.clearCart = (id_customer, result) => {
  sql.query(
    "DELETE FROM cart WHERE id_customer = ?",
    [id_customer],
    (err, res) => {
      if (err) {
        console.log("Clear Cart error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Cart;
