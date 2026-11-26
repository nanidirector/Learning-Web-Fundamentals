
const express = require('express');

const productRoutes = express.Router();

const productController = require('../controllers/productController');

// GET all products
productRoutes.get('/', productController.getAllProducts);

// POST a new product
productRoutes.post('/', productController.addProduct);

// GET product by ID
productRoutes.get('/:id', productController.getProductById);

module.exports = productRoutes;
