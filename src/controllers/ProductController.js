const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const Brand = require("../models/BrandModel");
const ProductImage = require("../models/ProductImageModel");

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
const createProduct = async (req, res) => {
  try {
    const {
      productCode,
      productName,
      description,
      importPrice,
      salePrice,
      brand,
      category,
      origin,
      warranty
    } = req.body;

    // Lấy danh sách ảnh và specFile từ req.files
    const images = req.files["images"] ? req.files["images"].map(file => file.filename) : [];
    const specFile = req.files["specFile"] ? req.files["specFile"][0].filename : null;

    // Debug: Kiểm tra file nhận được
    console.log("Files received:", req.files);
    console.log("Images:", images);
    console.log("SpecFile:", specFile);

    // Tạo đối tượng sản phẩm mới
    const newProduct = {
      fancy_id: productCode,
      name: productName,
      description,
      import_price: importPrice,
      retail_price: salePrice,
      brand_id: brand,
      category_id: category,
      origin,
      warranty,
      //spec_file: specFile // Thêm specFile nếu cần
    };

    // Insert sản phẩm
    Product.create(newProduct, async (err, createdProduct) => {
      if (err) {
        console.error("Lỗi khi tạo sản phẩm:", err);
        return res.status(500).json({ success: false, message: err.message || "Lỗi khi tạo sản phẩm." });
      }

      const productId = createdProduct.id || createdProduct.insertId;
      const imageInserts = [];

      // Thêm tất cả ảnh vào imageInserts
      images.forEach(filename => {
        imageInserts.push({
          product_id: productId,
          URL: filename
        });
      });

      // Insert ảnh vào product_image
      if (imageInserts.length > 0) {
        ProductImage.bulkInsert(imageInserts, (err2) => {
          if (err2) {
            console.error("Lỗi lưu ảnh:", err2);
            return res.status(500).json({ success: false, message: "Lỗi khi lưu ảnh sản phẩm." });
          }
          res.status(201).json({ success: true, message: "Tạo sản phẩm thành công!" });
        });
      } else {
        res.status(201).json({ success: true, message: "Tạo sản phẩm thành công (không có ảnh)." });
      }
    });
  } catch (error) {
    console.error("Lỗi khi xử lý sản phẩm:", error);
    res.status(500).json({ success: false, message: "Lỗi khi xử lý sản phẩm." });
  }
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