
const store = require('../data/store');
const AppError = require('../utils/appError');

const getCartByUserId = (userId) => {
    const user = store.users.find(
        (user) => user.id === Number(userId)
    );

    if (!user) {
        throw new AppError('User not found', 404);
    }

    const cart = store.carts.find(
        (cart) => cart.userId === Number(userId)
    );

    return cart || {
        userId: Number(userId),
        products: []
    };
};

const addToCart = (userId, productId, quantity) => {
    const user = store.users.find(
        (user) => user.id === Number(userId)
    );

    if (!user) {
        throw new AppError('User not found', 404);
    }

    const product = store.products.find(
        (product) => product.id === Number(productId)
    );

    if (!product) {
        throw new AppError('Product not found', 404);
    }

    if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
        throw new AppError('Quantity must be a positive integer', 400);
    }

    let cart = store.carts.find(
        (cart) => cart.userId === Number(userId)
    );

    if (!cart) {
        cart = {
            userId: Number(userId),
            products: []
        };

        store.carts.push(cart);
    }

    const existingProduct = cart.products.find(
        (item) => item.productId === Number(productId)
    );

    if (existingProduct) {
        existingProduct.quantity += Number(quantity);
    } else {
        cart.products.push({
            productId: Number(productId),
            quantity: Number(quantity)
        });
    }

    return cart;
};

module.exports = {
    getCartByUserId,
    addToCart
};
