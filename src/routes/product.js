const express = require('express');
const {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/ProductController');

const router = express.Router();

// Get all products or filter by name (optional query param ?name=)
router.get('/', getProduct);

// Get a single product by fancy_id
router.get('/:id', getProductById);

// Create a new product
router.post('/', createProduct);

// Update product by fancy_id
router.put('/:id', updateProduct);

// Delete product by fancy_id
router.delete('/:id', deleteProduct);

module.exports = router;
