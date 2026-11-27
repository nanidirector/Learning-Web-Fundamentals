
const express = require('express');

const app = express();

const productRoutes = require('./routes/productRoutes');

// Middleware to parse JSON data
app.use(express.json());

// Product routes
app.use('/api/products', productRoutes);

// Start server
app.listen(3001, () => {
    console.log('Server running at http://localhost:3001');
});
