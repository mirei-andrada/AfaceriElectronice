// backend/routes/cartRoutes.js

const express = require('express');
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    saveCart
} = require('../controllers/cartController');

const router = express.Router();

// Route to get cart for a user
router.get('/:userId', getCart);

// Route to add item to cart
router.post('/', addToCart);

// Route to update item in cart
router.put('/', updateCartItem);

// Route to remove item from cart
router.delete('/', removeFromCart);

// Ruta pentru salvarea coșului
router.post('/save', saveCart);

module.exports = router;
