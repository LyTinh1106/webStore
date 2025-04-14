const express = require('express');
const {
  createImage,
  getImageById,
  getImagesByProductId,
  updateImage,
  deleteImage
} = require('../controllers/ProductImageController');

const router = express.Router();

router.post('/', createImage);
router.get('/product/:product_id', getImagesByProductId); // tránh trùng
router.get('/:id', getImageById);
router.put('/:id', updateImage);
router.delete('/:id', deleteImage);

module.exports = router;
