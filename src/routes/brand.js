const express = require('express');
const {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand
} = require('../controllers/BrandController');

const router = express.Router();


router.get('/', getAllBrands);           
router.get('/:id', getBrandById);       
router.post('/create', createBrand);           
router.put('/update/:id', updateBrand);         
router.delete('/delete/:id', deleteBrand);      

module.exports = router;
