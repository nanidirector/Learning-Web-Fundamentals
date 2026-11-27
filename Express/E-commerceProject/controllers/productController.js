const productService =require('../services/productService');
const getAllProducts = (req, res) => {
    const products =productService.getAllProducts();
    res.json(products);
};

const addProduct = (req, res) =>{
    const product =req.body;
    const newProduct  =productService.addProduct(product);
    res.status(201).json({
        message :"Product added Successfully",
        product: newProduct
    });
}

const getProductById = (req, res) => {
    const id = req.params.id;
    const product =productService.getProductById(id);

    res.json(product);
};

module.exports = {
    getAllProducts,
    addProduct,
    getProductById
};
