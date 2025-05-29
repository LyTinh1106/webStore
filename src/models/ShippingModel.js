const sql = require('../config/database');

// Hàm hỗ trợ định dạng ngày giờ thành YYYY-MM-DD HH:mm:ss

const formatDate = date => {
  if (!date) return null;
  const d = new Date(date);
  const pad = n => String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
       + ` ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const Shipping = function(shipping) {
  this.shipping_date   = shipping.shipping_date ? formatDate(shipping.shipping_date) : null;
  this.delivery_method = shipping.delivery_method;
  this.shipping_status = shipping.shipping_status;
  this.id_customer     = shipping.id_customer;
  this.id_order        = shipping.id_order;
  this.shipping_address= shipping.shipping_address;
};

// Tạo shipping
Shipping.create = (newShipping, result) => {
  const formatted = {
    ...newShipping,
    shipping_date: newShipping.shipping_date ? formatDate(newShipping.shipping_date) : null
  };
  sql.query("INSERT INTO shipping SET ?", formatted, (err, res) => {
    if (err) return result(err, null);
    const inserted = { id: res.insertId, ...formatted };
    Shipping.updateOrderStatusToCompleted(inserted.id_order, (uErr, uRes) => {
      if (uErr) {
        // tạo xong shipping nhưng update order status fail
        return result(null, { ...inserted, orderUpdate: "Thất bại" });
      }
      result(null, { ...inserted, orderUpdate: "Hoàn thành" });
    });
  });
};

// Cập nhật trạng thái đơn sang Hoàn thành
Shipping.updateOrderStatusToCompleted = (orderId, result) => {
  sql.query(
    "UPDATE order_table SET order_status = 'Hoàn thành' WHERE id = ?",
    [orderId],
    (err, res) => {
      if (err) return result(err, null);
      if (res.affectedRows === 0) return result({ kind: "not_found" }, null);
      result(null, { orderId, status: "Hoàn thành" });
    }
  );
};

// Lấy 1 shipping kèm fullname từ order_table
Shipping.findById = (id, result) => {
  const query = `
    SELECT
      s.*,
      o.fullname    AS customer_name,
      o.phone       AS customer_phone,
      o.address     AS order_address
    FROM shipping s
    JOIN order_table o ON s.id_order = o.id
    WHERE s.id = ?
  `;
  sql.query(query, [id], (err, rows) => {
    if (err) return result(err, null);
    if (!rows.length) return result({ kind: "not_found" }, null);
    const sh = rows[0];
    sh.shipping_date = sh.shipping_date ? formatDate(sh.shipping_date) : null;
    result(null, sh);
  });
};

// Lấy tất cả shipping kèm fullname
Shipping.getAll = result => {
  const query = `
    SELECT
      s.*,
      o.fullname    AS customer_name,
      o.phone       AS customer_phone,
      o.address     AS order_address
    FROM shipping s
    JOIN order_table o ON s.id_order = o.id
    ORDER BY s.shipping_date DESC
  `;
  sql.query(query, (err, rows) => {
    if (err) return result(err, null);
    const list = rows.map(sh => ({
      ...sh,
      shipping_date: sh.shipping_date ? formatDate(sh.shipping_date) : null
    }));
    result(null, list);
  });
};

// Update shipping
Shipping.updateById = (id, shipping, result) => {
  const f = {
    ...shipping,
    shipping_date: shipping.shipping_date ? formatDate(shipping.shipping_date) : null
  };
  sql.query(
    `UPDATE shipping
     SET shipping_date=?, delivery_method=?, shipping_status=?,
         id_customer=?, id_order=?, shipping_address=?
     WHERE id=?`,
    [f.shipping_date, f.delivery_method, f.shipping_status,
     f.id_customer, f.id_order, f.shipping_address, id],
    (err, res) => {
      if (err) return result(err, null);
      if (res.affectedRows === 0) return result({ kind: "not_found" }, null);
      result(null, { id, ...f });
    }
  );
};

// Xóa shipping
Shipping.remove = (id, result) => {
  sql.query("DELETE FROM shipping WHERE id = ?", [id], (err, res) => {
    if (err) return result(err, null);
    if (res.affectedRows === 0) return result({ kind: "not_found" }, null);
    result(null, res);
  });
};


module.exports = Shipping;