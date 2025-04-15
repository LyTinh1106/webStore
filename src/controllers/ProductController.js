const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const Brand = require("../models/BrandModel");

// [GET] /products - Hiển thị trang quản lý sản phẩm
const getProduct = (req, res) => {
  Product.getAll(null, (err, products) => {
    if (err) {
      return res.status(500).render("error", { message: "Lỗi khi lấy danh sách sản phẩm." });
    }

    Category.getAll((err, categories) => {
      if (err) {
        return res.status(500).render("error", { message: "Lỗi khi lấy danh sách danh mục." });
      }

      Brand.getAll(null, (err, brands) => {
        if (err) {
          return res.status(500).render("error", { message: "Lỗi khi lấy danh sách nhãn hàng." });
        }

        res.render("Product", {
          user: req.user || null,
          products,
          categories,
          brands
        });
      });
    });
  });
};

// [GET] /store - Hiển thị trang cửa hàng
const getStore = (req, res) => {
  Product.getAll(null, (err, products) => {
    if (err) {
      return res.status(500).render("error", { message: "Lỗi khi lấy danh sách sản phẩm trong cửa hàng." });
    }

    res.render("Store", {
      user: req.user || null,
      products
    });
  });
};

// [POST] /products - Tạo sản phẩm mới
const createProduct = (req, res) => {
  const {
    fancy_id,
    name,
    description,
    import_price,
    retail_price,
    brand_id,
    category_id,
    origin,
    warranty,
  } = req.body;

  if (!fancy_id || !name) {
    return res.status(400).render("error", { message: "Mã sản phẩm và tên sản phẩm là bắt buộc." });
  }

  const newProduct = new Product({
    fancy_id,
    name,
    description,
    import_price,
    retail_price,
    brand_id,
    category_id,
    origin,
    warranty,
  });

  Product.create(newProduct, (err, data) => {
    if (err) {
      return res.status(500).render("error", { message: err.message || "Lỗi khi tạo sản phẩm." });
    }
    res.redirect("/products");
  });
};

// [GET] /products/:id - Chi tiết sản phẩm
const getProductById = (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).render("error", { message: "Không tìm thấy sản phẩm." });
      }
      return res.status(500).render("error", { message: "Lỗi khi truy xuất sản phẩm." });
    }

    res.render("ProductDetail", {
      user: req.user || null,
      product
    });
  });
};

// [POST] /products/:id/update - Cập nhật sản phẩm
const updateProduct = (req, res) => {
  const {
    fancy_id,
    name,
    description,
    import_price,
    retail_price,
    brand_id,
    category_id,
    origin,
    warranty,
  } = req.body;

  if (!name) {
    return res.status(400).render("error", { message: "Tên sản phẩm là bắt buộc." });
  }

  const updatedProduct = new Product({
    fancy_id,
    name,
    description,
    import_price,
    retail_price,
    brand_id,
    category_id,
    origin,
    warranty,
  });

  Product.updateById(req.params.id, updatedProduct, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).render("error", { message: "Không tìm thấy sản phẩm." });
      }
      return res.status(500).render("error", { message: "Lỗi khi cập nhật sản phẩm." });
    }

    res.redirect("/products");
  });
};

// [POST] /products/:id/delete - Xóa sản phẩm
const deleteProduct = (req, res) => {
  Product.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).render("error", { message: "Không tìm thấy sản phẩm." });
      }
      return res.status(500).render("error", { message: "Lỗi khi xóa sản phẩm." });
    }

    res.redirect("/products");
  });
};

module.exports = {
  getProduct,
  getStore,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
};
