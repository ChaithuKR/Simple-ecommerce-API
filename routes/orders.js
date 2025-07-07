const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getUserOrders, 
  getOrder, 
  getAllOrders, 
  updateOrderStatus 
} = require('../controllers/orderController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/role');

// User routes (require authentication)
router.post('/', auth, createOrder);
router.get('/my-orders', auth, getUserOrders);
router.get('/:id', auth, getOrder);

// Admin routes
router.get('/', auth, roleCheck(['admin']), getAllOrders);
router.put('/:id/status', auth, roleCheck(['admin']), updateOrderStatus);

module.exports = router; 