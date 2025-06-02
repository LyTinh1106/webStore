const { or } = require('sequelize');
const sql = require('../config/database');

const Order = function (order) {
  this.created_at = order.created_at;
  this.payment_method = order.payment_method;
  this.order_status = order.order_status;
  this.account_id = order.account_id;
  this.total_payment = order.total_payment;
  this.fullname = order.fullname;
  this.email = order.email;
  this.phone = order.phone;
  this.address = order.address;
  this.voucher_id = order.voucher_id;
  this.note = order.note;
  this.payment = order.payment
};


Order.create = (newOrder, result) => {
  const query = `
    INSERT INTO order_table 
(created_at, payment_method, order_status, account_id, total_payment, fullname, phone, address, voucher_id, note, order_payment)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

  `;

  const values = [
    newOrder.created_at,
    newOrder.payment_method,
    newOrder.order_status,
    newOrder.account_id,
    newOrder.total_payment,
    newOrder.fullname,
    newOrder.phone,
    newOrder.address,
    newOrder.voucher_id,
    newOrder.note,
    newOrder.order_payment
  ];

  sql.query(query, values, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
   

    result(null, { id: res.insertId, ...newOrder });
  });
};


Order.findById = (id, result) => {
  // Lấy thông tin đơn hàng kèm voucher_code
  sql.query("SELECT o.*, v.voucher_code FROM order_table o LEFT JOIN voucher v ON o.voucher_id = v.id WHERE o.id = ?", [id], (err, orderRes) => {
    if (err) {
      result(err, null);
      return;
    }

    if (orderRes.length === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    const order = orderRes[0];

    // Lấy danh sách sản phẩm trong đơn hàng
    sql.query(
      `SELECT od.*, p.name AS product_name
       FROM order_detail od
       JOIN product p ON od.product_id = p.id
       WHERE od.order_id = ?`,
      [id],
      (err2, detailsRes) => {
        if (err2) {
          result(err2, null);
          return;
        }

        // Gộp thông tin đơn hàng và danh sách sản phẩm
        order.products = detailsRes;
        result(null, order);
      }
    );
  });
};


Order.findByAccountId = (account_id, result) => {
  sql.query("SELECT o.*, a.email, v.voucher_code FROM order_table o JOIN account a ON o.account_id = a.id LEFT JOIN voucher v ON o.voucher_id = v.id WHERE a.id = ?", [account_id], (err, res) => {
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
  sql.query("SELECT o.*, a.email, v.voucher_code FROM order_table o JOIN account a on o.account_id = a.id LEFT JOIN voucher v ON o.voucher_id = v.id ORDER BY o.id DESC", (err, res) => {
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

Order.delete = (id, result) => {
  // Xóa sản phẩm trong đơn hàng trước
  sql.query("DELETE FROM order_detail WHERE order_id = ?", [id], (err1, res1) => {
    if (err1) {
      console.error(" Lỗi khi xóa order_detail:", err1);
      result(err1, null);
      return;
    }

    // Sau đó xóa chính đơn hàng
    sql.query("DELETE FROM order_table WHERE id = ?", [id], (err2, res2) => {
      if (err2) {
        console.error("Lỗi khi xóa order_table:", err2);
        result(err2, null);
        return;
      }

      if (res2.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res2);
    });
  });
};


Order.UpdateStatusById = (id, result) => {
  sql.query(
    `UPDATE order_table SET order_status = "Đã duyệt" WHERE id = ?`,
    [id],
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
      console.log("updated order: ", { id });
      result(null, { id });
    }
  );
};

Order.GetRevenueByMonthOfYear = (year, result) => {
  sql.query(
    `CALL get_monthly_revenue(?);`,
    [year],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      const data = res[0];

      if (!data || data.length === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Revenue of year:", data);
      result(null, data);
    }
  );
};

Order.GetRevenueByDayOfMonth = (year, month, result) => {
  sql.query(`CALL get_daily_revenue(?, ?)`, [year, month],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      const data = res[0];
      if (!data || data.length === 0) {
        result({ Kind: "not_found" }, null);
        return;
      }
      console.log("Revenue of month: ", data);
      result(null, data);
    }
  )
}

Order.GetRevenueByQuatersOfYear = (year, result) => {
  sql.query(
    `CALL get_quarterly_revenue(?);`,
    [year],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      const data = res[0];

      if (!data || data.length === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Revenue of quaters:", data);
      result(null, data);
    }
  );
};

Order.GetRevenueByDateRange = (startDate, endDate, result) => {
  sql.query(
    `CALL get_revenue_between_dates(?, ?)`, [startDate, endDate],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      const data = res[0];
      if (!data || data.length === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Revenue of date range:", data);
      result(null, data);
    }
  )
}

Order.GetProuctQuantityByYear = (year, result) => {
  sql.query(
    `CALL get_sold_quantity_by_product(?);`,
    [year],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      const data = res[0];
      if (!data || data.length === 0) {
        result({ kind: "not_found" }, data);
        return;
      }
      console.log("Sold product in year:", data);
      result(null, data);
    }
  );
};

Order.GetProductQuantityByMonth = (year, month, result) => {
  sql.query(`CALL get_sold_quantity_by_product_monthly(?, ?);`, [year, month], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    const data = res[0];
    if (!data || data.length === 0) {
      result({ kind: "not_found" }, data);
      return;
    }
    console.log("Sold product in month :", data);
    result(null, data);
  })
}

Order.GetProductQuantityByQuaters = (year, result) => {
  sql.query(`CALL get_sold_quantity_by_product_quarterly(?);`, [year], (err, res) => {
    if (err) {
      console.log("Error calling stored procedure:", err);
      result(null, err);
      return;
    }

    const data = res[0];
    if (!data || data.length === 0) {
      console.log(`No data found for year: ${year}`);
      result({ kind: "not_found" }, data);
      return;
    }

    console.log(`Sold product in quarters for year ${year}:`, data);
    result(null, data);
  });
};

Order.GetProductQuantityByDateRange = (dateStart, dateEnd, result) => {
  sql.query(`CALL get_sold_quantity_by_product_between_dates(?, ?);`, [dateStart, dateEnd], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    const data = res[0];
    if (!data || data.length === 0) {
      result({ kind: "not_found" }, data);
      return;
    }
    console.log("Sold product in date range:", data);  // Đã sửa lỗi ở đây
    result(null, data);
  });
}

Order.GetExistingYear = (result) => {
  sql.query(`
    SELECT DISTINCT YEAR(created_at) AS year
    FROM order_table
    ORDER BY year DESC;
    `,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    });
};


Order.GetStats = (result) => {
  sql.query(`SELECT * FROM view_dashboard_summary`,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

// OrderModel.js (hoặc tương đương)
Order.getOnDeliveringBasicInfo = (result) => {
  const query = `
    SELECT o.id, o.fullname, o.phone, v.voucher_code, v.voucher_value
    FROM order_table o
    LEFT JOIN voucher v ON o.voucher_id = v.id
    WHERE o.order_status = 'Chờ duyệt'
  `;
  sql.query(query, (err, res) => {
    if (err) return result(err, null);
    result(null, res);
  });
};



Order.findById = (id, result) => {
  const query = `
    SELECT o.*, a.email, v.voucher_code, v.voucher_value
    FROM order_table o
    JOIN account a ON o.account_id = a.id
    LEFT JOIN voucher v ON o.voucher_id = v.id
    WHERE o.id = ?
  `;
  sql.query(query, [id], (err, res) => {
    if (err) {
      console.error("Lỗi truy vấn findById:", err);
      return result(err, null);
    }
    if (res.length === 0) {
      console.warn("Không tìm thấy đơn hàng với id:", id);
      return result(null, null);
    }
    result(null, res[0]);
  });
};



module.exports = Order;
