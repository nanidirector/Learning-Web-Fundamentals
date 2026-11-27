const cartService = require('../services/cartService');
const getCart =(req,res)=>{
    const userId =req.params.userId;
    const cart =cartService.getCartByUserId(userId);
    res.json(cart);
};
const addToCart =(req,res)=>{
    const userId =req.params.userId;
    const{productId, quantity} =req.body;
    const cart= cartService.addToCart(userId,productId,quantity);
    res.status(201).json({
        message:"Product added to cart Successfully",
        cart:cart
    });
};
module.exports ={
    getCart,
    addToCart
};