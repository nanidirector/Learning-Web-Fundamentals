
const express = require('express');

const cartRouter = express.Router();

const cartController = require('../controllers/cartController');

// GET cart for a specific user
cartRouter.get('/', (req, res) => {
    res.send("Please provide a user ID");
});

cartRouter.get('/:userId', cartController.getCart);

// POST product to user's cart
cartRouter.post('/:userId', cartController.addToCart);

module.exports = cartRouter;
