const express = require('express');
const {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  filterByCategory,
  filterByBrand,
  filterByPrice
} = require('../controllers/ProductController');
const upload = require('../middleware/upload')

const router = express.Router();

router.get('/', getProduct);


router.get('/:id', getProductById);


router.post(
  "/create",
  upload.fields([
    { name: "images", maxCount: 6 }, // Tối đa 6 ảnh
    { name: "specFile", maxCount: 1 } // 1 file thông số kỹ thuật
  ]),
  createProduct
);

// router.put('/update/:id', updateProduct);
router.put(
  '/update/:id',
  upload.fields([
    { name: 'images', maxCount: 6 },
    { name: 'specFile', maxCount: 1 }
  ]),
  updateProduct
);



router.delete('/delete/:id', deleteProduct);
router.post('/filter/categories', filterByCategory);
router.post('/filter/brands', filterByBrand);
router.post('/filter-price', filterByPrice);



module.exports = router;
