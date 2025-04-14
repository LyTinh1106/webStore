const express = require('express');
const {
  createSpecification,
  getSpecificationById,
  getSpecificationByProductId,
  updateSpecification,
  deleteSpecification
} = require('../controllers/ProductDetailController');

const router = express.Router();

router.post('/', createSpecification);
router.get('/product/:product_id', getSpecificationByProductId);
router.get('/:id', getSpecificationById);
router.put('/:id', updateSpecification);
router.delete('/:id', deleteSpecification);

module.exports = router;
