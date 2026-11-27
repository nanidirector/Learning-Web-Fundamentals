
const store = require('../data/store');
const AppError = require('../utils/appError');

const getAllProducts = () => {
    return store.products;
};

const getProductById = (id) => {
    const product = store.products.find(
        (product) => product.id === Number(id)
    );

    if (!product) {
        throw new AppError('Product not found', 404);
    }

    return product;
};

const addProduct = (product) => {
    if (!product.name || product.price === undefined ||
        !Number.isFinite(Number(product.price)) ||
        Number(product.price) < 0) {
        throw new AppError('Valid product name and price are required', 400);
    }

    const newProduct = {
        id: store.products.length
            ? Math.max(...store.products.map(product => product.id)) + 1
            : 1,
        name: product.name,
        price: Number(product.price)
    };

    store.products.push(newProduct);
    return newProduct;
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct
};
