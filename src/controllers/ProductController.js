const sql = require('../config/database');

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


const getStore = (req, res) => {
  Product.getAll(null, (err, products) => {
    if (err) {
      return res.status(500).render("error", { message: "Lỗi khi lấy danh sách sản phẩm trong cửa hàng." });
    }

    Category.getAll((err, categories) => {
      if (err) {
        return res.status(500).render("error", { message: "Lỗi khi lấy danh sách danh mục." });
      }

      Brand.getAll((err, brands) => {
        if (err) {
          return res.status(500).render("error", { message: "Lỗi khi lấy thương hiệu." });
        }
        
         

            res.render("Store", {
              user: req.user || null,
              products,
              categories,
              brands
              
              
            });
          });
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

      
      let specJson = null;
      if (specFile) {
        try {
          const filePath = path.join(__dirname, '../public/images/', specFile.filename); // Điều chỉnh đường dẫn theo cấu trúc thư mục của bạn
          const fileContent = await fs.readFile(filePath, 'utf-8');
          specJson = JSON.parse(fileContent); 
          console.log("Spec JSON:", specJson);
        } catch (err) {
          console.error("Lỗi khi đọc hoặc parse specFile:", err);
          return res.status(400).json({ success: false, message: "Lỗi khi đọc file thông số kỹ thuật." });
        }
      }

      
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
        
      };

     
      Product.create(newProduct, async (err, createdProduct) => {
        if (err) {
          console.error("Lỗi khi tạo sản phẩm:", err);
          return res.status(500).json({ success: false, message: err.message || "Lỗi khi tạo sản phẩm." });
        }

        const productId = createdProduct.id || createdProduct.insertId;
        const imageInserts = [];

        
        images.forEach(filename => {
          imageInserts.push({
            product_id: productId,
            URL: filename
          });
        });

        
        if (specJson) {
          try {
            
            const newDetail = {
              product_id: productId,
              specs: JSON.stringify(specJson) 
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
      } else {
        return res.status(201).json({ success: true, message: "Cập nhật product thành công!", product: data });
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

  const filterByCategory = (req, res) => {
    
    const categoryIds = (req.body.category_ids || []).map(Number);
  
    if (categoryIds.length === 0) {
      return res.json([]); // Không có danh mục → không lọc
    }
  
    const placeholders = categoryIds.map(() => '?').join(',');
    const query = `
      SELECT p.*, c.name AS category_name, pi.URL AS image
      FROM product p
      LEFT JOIN category c ON p.category_id = c.id
      LEFT JOIN product_image pi ON pi.id = (
        SELECT id FROM product_image
        WHERE product_id = p.id
        ORDER BY id ASC LIMIT 1
      )
      WHERE p.category_id IN (${placeholders})
    `;
  
    const sql = require('../config/database');
    sql.query(query, categoryIds, (err, result) => {
      if (err) {
        console.error("Lỗi lọc danh mục:", err);
        return res.status(500).json({ error: 'Lỗi server khi lọc danh mục' });
      }
  
      res.json(result);
    });
  };
  
  const filterByBrand = (req, res) => {
    
    const brandIds = (req.body.brand_ids || []).map(Number);
  
    if (brandIds.length === 0) {
      return res.json([]); // Không có brand → không lọc
    }
  
    const placeholders = brandIds.map(() => '?').join(',');
    const query = `
      SELECT p.*, c.name AS category_name, pi.URL AS image
      FROM product p
      LEFT JOIN category c ON p.category_id = c.id
      LEFT JOIN product_image pi ON pi.id = (
        SELECT id FROM product_image
        WHERE product_id = p.id
        ORDER BY id ASC LIMIT 1
      )
      WHERE p.brand_id IN (${placeholders})
    `;
  
    const sql = require('../config/database');
    sql.query(query, brandIds, (err, result) => {
      if (err) {
        console.error("Lỗi lọc thương hiệu:", err);
        return res.status(500).json({ error: 'Lỗi server khi lọc thương hiệu' });
      }
  
      res.json(result);
    });
  };
  
  const filterByPrice = (req, res) => {
    const min = Number(req.body.min) || 0;
    const max = Number(req.body.max) || 999999;
  
    const query = `
      SELECT p.*, c.name AS category_name, pi.URL AS image
      FROM product p
      LEFT JOIN category c ON p.category_id = c.id
      LEFT JOIN product_image pi ON pi.id = (
        SELECT id FROM product_image
        WHERE product_id = p.id
        ORDER BY id ASC LIMIT 1
      )
      WHERE p.retail_price BETWEEN ? AND ?
    `;
  
    const sql = require('../config/database');
    sql.query(query, [min, max], (err, result) => {
      if (err) {
        console.error("Lỗi lọc theo giá:", err);
        return res.status(500).json({ error: 'Lỗi server khi lọc giá' });
      }
  
      res.json(result);
    });
  };
  
  
  




  module.exports = {
    getProduct,
    getStore,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    filterByCategory,
    filterByBrand,
    filterByPrice
    
  };