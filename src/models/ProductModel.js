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
  sql.query("SELECT p.*, c.name as `category_name` FROM product p LEFT JOIN category c ON c.id = p.category_id  WHERE p.id = ?", [id], (err, res) => {
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

Product.getAll = (nameOrCategoryId, result) => {
  let query = `
  SELECT 
    p.*, 
    c.name AS category_name, 
    b.brand_name,
    pi.URL AS image
  FROM product p
  LEFT JOIN category c ON p.category_id = c.id
  LEFT JOIN brand b ON p.brand_id = b.brand_id
  LEFT JOIN product_image pi ON pi.id = (
    SELECT id FROM product_image 
    WHERE product_id = p.id 
    ORDER BY id ASC 
    LIMIT 1
  )
`;


  let params = [];

  if (nameOrCategoryId) {
    // Nếu là số → xem là categoryId
    if (!isNaN(nameOrCategoryId)) {
      query += " WHERE p.category_id = ?";
      params.push(nameOrCategoryId);
    } else {
      // Nếu là chuỗi → xem là từ khóa tìm kiếm
      query += " WHERE p.name LIKE ?";
      params.push(`%${nameOrCategoryId}%`);
    }
  }

  sql.query(query, params, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }


    // console.log("products: ", res);
    
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
        result(null, res3); 
      });
    });
  });
};
// lọc
Product.filterCombined = (filterData, result) => {
  const { category_ids = [], brand_ids = [], min = 0, max = 999999 } = filterData;

  let query = `
    SELECT 
      p.*, 
      c.name AS category_name, 
      pi.URL AS image
    FROM product p
    LEFT JOIN category c ON p.category_id = c.id
    LEFT JOIN product_image pi ON pi.id = (
      SELECT id FROM product_image 
      WHERE product_id = p.id 
      ORDER BY id ASC LIMIT 1
    )
    WHERE p.retail_price BETWEEN ? AND ?
  `;

  const params = [min, max];

  if (category_ids.length > 0) {
    query += ` AND p.category_id IN (${category_ids.map(() => '?').join(',')})`;
    params.push(...category_ids);
  }

  if (brand_ids.length > 0) {
    query += ` AND p.brand_id IN (${brand_ids.map(() => '?').join(',')})`;
    params.push(...brand_ids);
  }

  sql.query(query, params, (err, res) => {
    if (err) {
      console.log("Lỗi khi lọc sản phẩm kết hợp: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//phân trang
Product.getAllWithPagination = (filter, limit, offset, callback) => {
  let query = `
    SELECT SQL_CALC_FOUND_ROWS 
      p.*, 
      c.name AS category_name, 
      pi.URL AS image
    FROM product p
    LEFT JOIN category c ON p.category_id = c.id
    LEFT JOIN product_image pi ON pi.id = (
      SELECT id FROM product_image 
      WHERE product_id = p.id 
      ORDER BY id ASC LIMIT 1
    )
  `;

  let params = [];

  if (filter) {
    if (!isNaN(filter)) {
      query += " WHERE p.category_id = ?";
      params.push(filter);
    } else {
      query += " WHERE p.name LIKE ?";
      params.push(`%${filter}%`);
    }
  }

  query += " LIMIT ? OFFSET ?";
  params.push(limit, offset);

  sql.query(query, params, (err, res) => {
    if (err) return callback(err, null, null);

    // Lấy tổng số lượng
    sql.query("SELECT FOUND_ROWS() as total", (err2, countRes) => {
      if (err2) return callback(err2, null, null);
      const totalCount = countRes[0].total;
      callback(null, res, totalCount);
    });
  });
};
















module.exports = Product;