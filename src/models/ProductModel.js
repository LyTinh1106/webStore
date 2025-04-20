const sql = require("../config/database");

const Product = function (product) {
  this.fancy_id = product.fancy_id;
  this.name = product.name;
  this.description = product.description;
  this.import_price = product.import_price;
  this.retail_price = product.retail_price;
  this.brand_id = product.brand_id;
  this.category_id = product.category_id;
  this.origin = product.origin;
  this.warranty = product.warranty;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (id, result) => {
  sql.query("SELECT * FROM product WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Product.getAll = (name, result) => {
  let query = `
    SELECT p.*, c.name as "category_name"
    FROM product p
    LEFT JOIN category c ON p.category_id = c.id
  `;
  let params = [];

  if (name) {
    query += " WHERE p.name LIKE ?";
    params.push(`%${name}%`);
  }

  sql.query(query, params, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};


Product.updateById = (id, product, result) => {
  sql.query(
    `UPDATE product SET fancy_id = ?, name = ?, description = ?, import_price = ?, retail_price = ?, brand_id = ?, category_id = ?, origin = ?, warranty = ?
     WHERE id = ?`,
    [
      product.fancy_id,
      product.name,
      product.description,
      product.import_price,
      product.retail_price,
      product.brand_id,
      product.category_id,
      product.origin,
      product.warranty,
      id,
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

      // console.log("updated product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  // Bước 1: Xóa thông số kỹ thuật liên quan đến sản phẩm
  sql.query("DELETE FROM technical_specification WHERE product_id = ?", [id], (err, res) => {
    if (err) {
      console.log("Lỗi khi xóa thông số kỹ thuật của sản phẩm:", err);
      result(null, err);
      return;
    }

    // Bước 2: Xóa tất cả các ảnh liên quan tới sản phẩm trong bảng product_image
    sql.query("DELETE FROM product_image WHERE product_id = ?", [id], (err2, res2) => {
      if (err2) {
        console.log("Lỗi khi xóa ảnh của sản phẩm:", err2);
        result(null, err2);
        return;
      }

      // Bước 3: Xóa sản phẩm khỏi bảng product
      sql.query("DELETE FROM product WHERE id = ?", [id], (err3, res3) => {
        if (err3) {
          console.log("Lỗi khi xóa sản phẩm:", err3);
          result(null, err3);
          return;
        }

        // Nếu không có sản phẩm nào bị xóa, trả về lỗi "not_found"
        if (res3.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("Đã xóa sản phẩm với id:", id);
        result(null, res3); // Trả về kết quả sau khi xóa
      });
    });
  });
};


module.exports = Product;