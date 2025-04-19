const express = require('express');
const {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct
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

router.put('/:id', updateProduct);


router.delete('/delete/:id', deleteProduct);

module.exports = router;
