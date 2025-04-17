const sql = require('../config/database');

// Hàm hỗ trợ định dạng ngày giờ thành YYYY-MM-DD HH:mm:ss
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.getFullYear() + '-' +
         String(d.getMonth() + 1).padStart(2, '0') + '-' +
         String(d.getDate()).padStart(2, '0') + ' ' +
         String(d.getHours()).padStart(2, '0') + ':' +
         String(d.getMinutes()).padStart(2, '0') + ':' +
         String(d.getSeconds()).padStart(2, '0');
};

const Shipping = function (shipping) {
  this.shipping_date = shipping.shipping_date ? formatDate(shipping.shipping_date) : null;
  this.delivery_method = shipping.delivery_method;
  this.shipping_status = shipping.shipping_status;
  this.id_customer = shipping.id_customer;
  this.id_order = shipping.id_order;
  this.shipping_address = shipping.shipping_address;
};

Shipping.create = (newShipping, result) => {
  const formattedShipping = {
    ...newShipping,
    shipping_date: newShipping.shipping_date ? formatDate(newShipping.shipping_date) : null
  };

  sql.query("INSERT INTO shipping SET ?", formattedShipping, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created shipping: ", { id: res.insertId, ...formattedShipping });
    result(null, { id: res.insertId, ...formattedShipping });
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
      const shipping = {
        ...res[0],
        shipping_date: res[0].shipping_date ? formatDate(res[0].shipping_date) : null
      };
      console.log("found shipping: ", shipping);
      result(null, shipping);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

// Lấy tất cả shipping
Shipping.getAll = (result) => {
  const query = `SELECT 
      s.*, 
      CONCAT(c.first_name, ' ', c.last_name) AS customer_name
    FROM 
      shipping s
    JOIN 
      customer c ON s.id_customer = c.id`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    const formattedShippings = res.map(shipping => ({
      ...shipping,
      shipping_date: shipping.shipping_date ? formatDate(shipping.shipping_date) : null
    }));

    console.log("shippings: ", formattedShippings);
    result(null, formattedShippings);
  });
};

// Cập nhật thông tin shipping theo ID
Shipping.updateById = (id, shipping, result) => {
  const formattedShipping = {
    ...shipping,
    shipping_date: shipping.shipping_date ? formatDate(shipping.shipping_date) : null
  };

  sql.query(
    `UPDATE shipping 
     SET shipping_date = ?, delivery_method = ?, shipping_status = ?, 
         id_customer = ?, id_order = ?, shipping_address = ?
     WHERE id = ?`,
    [
      formattedShipping.shipping_date,
      formattedShipping.delivery_method,
      formattedShipping.shipping_status,
      formattedShipping.id_customer,
      formattedShipping.id_order,
      formattedShipping.shipping_address,
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

      console.log("updated shipping: ", { id: id, ...formattedShipping });
      result(null, { id: id, ...formattedShipping });
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

    console.log("deleted shipping with id: ", id);
    result(null, res);
  });
};

module.exports = Shipping;