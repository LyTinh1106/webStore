const sql = require("../config/database");

const Importing = function(importing) {
  this.date = importing.date;
  this.total_price = importing.total_price;
  this.id_supplier = importing.id_supplier;
};


Importing.create = (newImporting, result) => {
  sql.query("INSERT INTO importing SET ?", newImporting, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newImporting });
  });
};

// Tìm theo id
Importing.findById = (id, result) => {
  sql.query("SELECT * FROM importing WHERE id = ?", [id], (err, res) => {
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

// Lấy tất cả phiếu nhập (có thể lọc theo supplier)
Importing.getAll = (supplierId, result) => {
  let query = "SELECT * FROM importing";
  let params = [];

  if (supplierId) {
    query += " WHERE id_supplier = ?";
    params.push(supplierId);
  }

  sql.query(query, params, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

// Cập nhật phiếu nhập
Importing.updateById = (id, importing, result) => {
  sql.query(
    "UPDATE importing SET date = ?, total_price = ?, id_supplier = ? WHERE id = ?",
    [importing.date, importing.total_price, importing.id_supplier, id],
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

      result(null, { id, ...importing });
    }
  );
};

// Xoá phiếu nhập
Importing.remove = (id, result) => {
  sql.query("DELETE FROM importing WHERE id = ?", [id], (err, res) => {
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
  });
};

module.exports = Importing;
