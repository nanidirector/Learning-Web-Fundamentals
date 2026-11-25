const express = require('express');
const cartRouter =express.Router();
cartRouter.get('/:userId',(req,res)=>{
    res.send(`Fetching cart for user with ID: ${req.params.userId}`);
})
cartRouter.post('/:userId',(req,res)=>{
    res.send(`Adding a product for user with ID: ${req.params.userId}`);
})

module.exports =cartRouter;