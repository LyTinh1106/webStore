const express = require('express');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/CategoryController');

const router = express.Router();
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/create', createCategory);
router.put('/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);

module.exports = router;
