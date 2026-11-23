const express = require('express');
const app = express();

app.use((req,res,next)=>{
    console.log('Middleware function called');
    console.log(`${req.method} request made to ${req.url}`);
    next();
    
})

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the Home Page</h1><br>
        <h2>use below links for navigation</h2><hr>
        <a href="/products">Products</a><br>
        <a href="/categories">Categories</a><br>`);
});
app.get('/products',(req,res)=>{
    console.log('Products route called');
    res.send('Here is the list of all products');
});
app.get('/categories',(req,res)=>{
    res.send('here is the list of all categories');
});
app.post('/products',(req,res)=>{
    res.send('Products created sucessfully');
})
app.post('/categories',(req,res)=>{
    res.send('Categories created sucessfully');
})
app.listen(4000,()=>{
    console.log('Server is running on port 4000');
})