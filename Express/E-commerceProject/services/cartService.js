const store = require('../data/store');
const getCartByUserId = (userId) => {
    return store.carts.find((cart)=>cart.userId ===Number(userId));
};
const addCart =(userId,productId,quantity)=>{
    let cart =getCartByUserId(userId);
    if(!cart){
        cart ={
            userID:Number(userId),
            products:[]
        };
        store.carts.push(cart);
    }
    const existingProduct =cart.products.find(
        (product)=>product.productId ===Number(productId)
    );
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.products.push({
            productId: Number(productId),
            quantity: quantity
        });
    }
    return cart;
};
module.exports ={
    getCartByUserId,addCart
}