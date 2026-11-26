
const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController');
// GET all users
userRoutes.get('/', userController.getAllUsers);
// POST a new user
userRoutes.post('/', userController.addUser);
// GET user by ID
userRoutes.get('/:id', userController.getUserById);
module.exports = userRoutes;
