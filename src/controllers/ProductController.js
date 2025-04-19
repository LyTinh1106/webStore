

const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const Brand = require("../models/BrandModel");
const ProductImage = require("../models/ProductImageModel");
const TechnicalSpecification = require('../models/ProductDetailModel');

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
const fs = require('fs').promises; // Thêm module fs để đọc file
const path = require('path');

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
    const specFile = req.files["specFile"] ? req.files["specFile"][0] : null;

    // Debug: Kiểm tra file nhận được
    console.log("Files received:", req.files);
    console.log("Images:", images);
    console.log("SpecFile:", specFile);

    // Đọc nội dung specFile và chuyển thành JSON
    let specJson = null;
    if (specFile) {
      try {
        const filePath = path.join(__dirname, '../public/images/', specFile.filename); // Điều chỉnh đường dẫn theo cấu trúc thư mục của bạn
        const fileContent = await fs.readFile(filePath, 'utf-8');
        specJson = JSON.parse(fileContent); // Chuyển nội dung file thành JSON
        console.log("Spec JSON:", specJson);
      } catch (err) {
        console.error("Lỗi khi đọc hoặc parse specFile:", err);
        return res.status(400).json({ success: false, message: "Lỗi khi đọc file thông số kỹ thuật." });
      }
    }

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
      // spec_file: specFile ? specFile.filename : null // Thêm specFile nếu cần
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

      // Gọi hàm tạo thông số kỹ thuật nếu specJson tồn tại
      if (specJson) {
        try {
          // Chuyển đổi specJson thành định dạng phù hợp với bảng technical_specification
          const newDetail = {
            product_id: productId,
            specs: JSON.stringify(specJson) // Lưu specJson dưới dạng chuỗi JSON
          };

          // Gọi TechnicalSpecification.create
          await new Promise((resolve, reject) => {
            TechnicalSpecification.create(newDetail, (err, result) => {
              if (err) {
                console.error("Lỗi khi tạo thông số kỹ thuật:", err);
                return reject(err);
              }
              console.log("Technical specification created:", result);
              resolve(result);
            });
          });
        } catch (err) {
          console.error("Lỗi khi tạo thông số kỹ thuật:", err);
          return res.status(500).json({ success: false, message: "Lỗi khi tạo thông số kỹ thuật." });
        }
      }

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

    
  });
};

// [POST] /products/:id/delete - Xóa sản phẩm
const deleteProduct = (req, res) => {
  const productId = req.params.id;

  
  ProductImage.findByProductId(productId, (err, images) => {
    if (err) {
      console.error("Lỗi khi tìm ảnh sản phẩm:", err);
      return res.status(500).render("error", { message: "Lỗi khi tìm ảnh sản phẩm." });
    }

    if (images && images.length > 0) {
      images.forEach((image) => {
        const filePath = path.join(__dirname, "../public/images", image.URL);

       
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.warn(`❌ File không tồn tại: ${filePath}`);
            return;
          }

          fs.unlink(filePath, (err) => {
            if (err) {
              console.warn(`Không thể xóa file ảnh ${filePath}:`, err.message);
            } else {
              console.log(`✅ Đã xóa file: ${filePath}`);
            }
          });
        });
      });
    }

   
    Product.remove(productId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).render("error", { message: "Không tìm thấy sản phẩm." });
        }
        return res.status(500).render("error", { message: "Lỗi khi xóa sản phẩm." });
      }

      res.status(200).json({ success: true, message: "Xóa sản phẩm thành công!" });
    });
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