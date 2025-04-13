const sql = require("../config/database");

const Supplier = function (supplier) {
  this.name = supplier.name;
  this.phonenumber = supplier.phonenumber;
  this.email = supplier.email;
  this.address = supplier.address;
};

// Thêm supplier mới
Supplier.create = (newSupplier, result) => {
  sql.query("INSERT INTO supplier SET ?", newSupplier, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newSupplier });
  });
};

// Lấy supplier theo ID
Supplier.findById = (id, result) => {
  sql.query("SELECT * FROM supplier WHERE id = ?", [id], (err, res) => {
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

// Lấy tất cả supplier
Supplier.getAll = (result) => {
  sql.query("SELECT * FROM supplier", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

// Cập nhật supplier theo ID
Supplier.updateById = (id, supplier, result) => {
  sql.query(
    "UPDATE supplier SET name = ?, phonenumber = ?, email = ?, address = ? WHERE id = ?",
    [supplier.name, supplier.phonenumber, supplier.email, supplier.address, id],
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

      result(null, { id: id, ...supplier });
    }
  );
};

// Xoá supplier theo ID
Supplier.remove = (id, result) => {
  sql.query("DELETE FROM supplier WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
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

module.exports = Supplier;
