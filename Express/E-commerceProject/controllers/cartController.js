const getCart =(req,res)=>{
    const userId =req.params.userId;
    res.send(`Fetching cart for user with Id: ${userId}`);
};
const addToCart =(req,res)=>{
    const userId =req.params.userId;
    res.send(`Adding a product for user with Id: ${userId}`);
};
module.exports ={
    getCart,
    addToCart
};