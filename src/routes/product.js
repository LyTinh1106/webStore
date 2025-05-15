const express = require('express');

const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  filterByCategory,
  filterByBrand,
  filterByPrice,
  searchProductRender,
  compareProducts,
  filterCombined

} = require('../controllers/ProductController');
const upload = require('../middleware/upload')
const { getProductByIdAPI } = require('../controllers/ProductController');
const router = express.Router();

router.get('/:id', getProductByIdAPI); // API lấy chi tiết sản phẩm theo ID
router.get('/', getProduct);
//tìm kiếm
router.get('/store', searchProductRender);


// router.get('/:id', getProductById);


router.post(
  "/create",
  upload.fields([
    { name: "images", maxCount: 3 }, // Tối đa 6 ảnh
    { name: "specFile", maxCount: 1 } // 1 file thông số kỹ thuật
  ]),
  createProduct
);

// router.put('/update/:id', updateProduct);
router.put(
  '/update/:id',
  upload.fields([
    { name: 'editImages', maxCount: 3 },
    { name: 'specFile', maxCount: 1 }
  ]),
  updateProduct
);




router.delete('/delete/:id', deleteProduct);
router.post('/filter/categories', filterByCategory);
router.post('/filter/brands', filterByBrand);
router.post('/filter-price', filterByPrice);
router.post('/filter', filterCombined);





module.exports = router;
