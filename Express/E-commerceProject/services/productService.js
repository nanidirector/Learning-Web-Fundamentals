const store =require('../data/store');

const getAllProducts =()=>{
    return store.products;
}
const getProductById =(id)=>{
    return store.products.find((product)=> product.id ===Number(id));
};
const addProduct =(product)=>{
    store.products.push(product);
    return product;
}
module.exports ={
    getAllProducts,
    getProductById,
    addProduct
};