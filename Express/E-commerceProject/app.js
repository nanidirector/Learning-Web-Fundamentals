
const express = require('express');

const app = express();

const PORT = 4500;

// Middleware to read JSON request bodies
app.use(express.json());

// Register routes
app.use('/users', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/cart', require('./routes/cartRoutes'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
