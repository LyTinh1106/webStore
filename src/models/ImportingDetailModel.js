const sql = require("../config/database");

const ImportingDetail = function(detail) {
  this.id_importing = detail.id_importing;
  this.id_product = detail.id_product;
  this.quantity = detail.quantity;
  this.subtotalprice = detail.subtotalprice;
};

// Thêm dòng chi tiết nhập hàng
ImportingDetail.create = (newDetail, result) => {
  sql.query("INSERT INTO importing_detail SET ?", newDetail, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, newDetail);
  });
};

// Tìm chi tiết theo id_importing
ImportingDetail.findByImportingId = (id_importing, result) => {
  sql.query(
    "SELECT * FROM importing_detail WHERE id_importing = ?",
    [id_importing],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, res);
    }
  );
};

// Cập nhật chi tiết nhập hàng
ImportingDetail.update = (id_importing, id_product, detail, result) => {
  sql.query(
    "UPDATE importing_detail SET quantity = ?, subtotalprice = ? WHERE id_importing = ? AND id_product = ?",
    [detail.quantity, detail.subtotalprice, id_importing, id_product],
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

      result(null, { id_importing, id_product, ...detail });
    }
  );
};

// Xoá chi tiết theo id_importing & id_product
ImportingDetail.remove = (id_importing, id_product, result) => {
  sql.query(
    "DELETE FROM importing_detail WHERE id_importing = ? AND id_product = ?",
    [id_importing, id_product],
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

module.exports = ImportingDetail;
