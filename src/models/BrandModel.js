const sql = require('../config/database');

const Brand = function(brand) {
  this.brand_name = brand.brand_name;
};


Brand.create = (newBrand, result) => {
  sql.query("INSERT INTO brand SET ?", newBrand, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { brand_id: res.insertId, ...newBrand });
  });
};


Brand.findById = (id, result) => {
  sql.query("SELECT * FROM brand WHERE brand_id = ?", [id], (err, res) => {
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


Brand.getAll = (result) => {
  const query = "SELECT * FROM brand";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};



Brand.updateById = (id, brand, result) => {
  sql.query(
    "UPDATE brand SET brand_name = ? WHERE brand_id = ?",
    [brand.brand_name, id],
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

      result(null, { brand_id: id, ...brand });
    }
  );
};


Brand.remove = (id, result) => {
  sql.query("DELETE FROM brand WHERE brand_id = ?", [id], (err, res) => {
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

module.exports = Brand;
