
const store = require('../data/store');
const AppError = require('../utils/appError');

const getAllUsers = () => {
    return store.users;
};

const getUserById = (id) => {
    const user = store.users.find(
        (user) => user.id === Number(id)
    );

    if (!user) {
        throw new AppError('User not found', 404);
    }

    return user;
};

const addUser = (user) => {
    if (!user.name || !user.email) {
        throw new AppError('Name and email are required', 400);
    }

    const newUser = {
        id: store.users.length
            ? Math.max(...store.users.map(user => user.id)) + 1
            : 1,
        name: user.name,
        email: user.email
    };

    store.users.push(newUser);
    return newUser;
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser
};
