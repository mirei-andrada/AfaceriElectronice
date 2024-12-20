// backend/routes/productRoutes.js

const express = require('express');
const {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

// Route to get all products
router.get('/', getAllProducts);

// Route to add a new product
router.post('/', addProduct);

// Route to update a product by ID
router.put('/:id', updateProduct);

// Route to delete a product by ID
router.delete('/:id', deleteProduct);

module.exports = router;
