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
    { name: "mainImage", maxCount: 1 },
    { name: "extraImages", maxCount: 5 },
    { name: "specFile", maxCount: 1 }
  ]),
  createProduct
);


router.put('/:id', updateProduct);


router.delete('/:id', deleteProduct);

module.exports = router;
