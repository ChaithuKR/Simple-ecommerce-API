const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/role');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin only routes
router.post('/', auth, roleCheck(['admin']), createProduct);
router.put('/:id', auth, roleCheck(['admin']), updateProduct);
router.delete('/:id', auth, roleCheck(['admin']), deleteProduct);

module.exports = router; 