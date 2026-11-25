const express =require('express');
const productRoutes =express.Router();
productRoutes.get('/',(req,res)=>{
    res.send("get all products");
});
productRoutes.post('/',(req,res)=>{
    res.send("Add product");
});
productRoutes.get('/:id',(req,res)=>{
    res.send(`Get product by ID: ${req.params.id}`);
});
module.exports =productRoutes;