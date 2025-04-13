const sql = require('../config/database');

const ProductImage = function(image) {
  this.product_id = image.product_id;
  this.URL = image.URL;
};

// Thêm ảnh mới cho sản phẩm
ProductImage.create = (newImage, result) => {
  sql.query("INSERT INTO product_image SET ?", newImage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newImage });
  });
};

// Tìm ảnh theo ID
ProductImage.findById = (id, result) => {
  sql.query("SELECT * FROM product_image WHERE id = ?", [id], (err, res) => {
    if (err) {
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

// Lấy tất cả ảnh theo product_id
ProductImage.findByProductId = (productId, result) => {
  sql.query("SELECT * FROM product_image WHERE product_id = ?", [productId], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res); // trả về mảng các ảnh
  });
};

// Cập nhật ảnh
ProductImage.updateById = (id, image, result) => {
  sql.query(
    "UPDATE product_image SET product_id = ?, URL = ? WHERE id = ?",
    [image.product_id, image.URL, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id, ...image });
    }
  );
};

// Xoá ảnh
ProductImage.remove = (id, result) => {
  sql.query("DELETE FROM product_image WHERE id = ?", [id], (err, res) => {
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

module.exports = ProductImage;
