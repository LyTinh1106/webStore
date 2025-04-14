const sql = require('../config/database');

const TechnicalSpecification = function(detail) {
  this.specs = JSON.stringify(detail.specs); 
  this.product_id = detail.product_id;
};

TechnicalSpecification.create = (newDetail, result) => {
  sql.query("INSERT INTO technical_specification SET ?", newDetail, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newDetail });
  });
};

// Lấy thông số kỹ thuật theo ID
TechnicalSpecification.findById = (id, result) => {
  sql.query("SELECT * FROM technical_specification WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      const row = res[0];

      if (typeof row.specs === 'string') {
        try {
          row.specs = JSON.parse(row.specs);
        } catch (err) {
          console.error("Lỗi khi parse specs trong findById:", err);
          result(err, null);
          return;
        }
      }

      result(null, row);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

// Lấy theo product_id
TechnicalSpecification.findByProductId = (productId, result) => {
  sql.query("SELECT * FROM technical_specification WHERE product_id = ?", [productId], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      const row = res[0];

      if (typeof row.specs === 'string') {
        try {
          row.specs = JSON.parse(row.specs);
        } catch (err) {
          console.error("Lỗi khi parse specs trong findByProductId:", err);
          result(err, null);
          return;
        }
      }

      result(null, row);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

// Cập nhật
TechnicalSpecification.updateById = (id, detail, result) => {
  sql.query(
    "UPDATE technical_specification SET specs = ?, product_id = ? WHERE id = ?",
    [JSON.stringify(detail.specs), detail.product_id, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id, ...detail });
    }
  );
};

// Xoá
TechnicalSpecification.remove = (id, result) => {
  sql.query("DELETE FROM technical_specification WHERE id = ?", [id], (err, res) => {
    if (err) {
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

module.exports = TechnicalSpecification;
