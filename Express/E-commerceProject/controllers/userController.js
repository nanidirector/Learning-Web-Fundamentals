const userService = require('../services/userService');
const getAllUsers = (req, res) => {
    const users = userService.getAllUsers();
    res.json(users);
};

const addUser = (req, res) => {
    const user = req.body;

    const newUser = userService.addUser(user);

    res.status(201).json({
        message: "User added successfully",
        user: newUser
    });
};

const getUserById = (req, res) => {
    const id = req.params.id;

    const user = userService.getUserById(id);

    res.json(user);
};

module.exports = {
    getAllUsers,
    addUser,
    getUserById
};
