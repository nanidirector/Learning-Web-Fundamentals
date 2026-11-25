const express = require('express');
const app = express();
const PORT =4500;

app.use('/users',require('./routes/userRoutes'));
app.use('/products',require('./routes/productRoutes'));
app.use('/cart',require('./routes/cartRoutes'));
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})