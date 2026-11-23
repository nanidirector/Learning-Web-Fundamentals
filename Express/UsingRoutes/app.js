const express = require('express');
const app = express();

const ProductRoutes = require('./routes/productRoutes');
const CategoryRoutes = require('./routes/categoryRoutes');

app.use('/products', ProductRoutes);
app.use('/categories', CategoryRoutes);

app.listen(4000, () => {
    console.log("Server running on port 4000");
});