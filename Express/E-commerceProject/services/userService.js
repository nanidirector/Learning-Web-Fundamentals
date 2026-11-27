const store = require('../data/store');
const getAllUsers =()=>{
    return store.users;
}
const getUserById =(id)=>{
    return store.users.find((user)=>user.id ===Number(id));
}
const addUser =(user)=>{
    store.users.push(user);
    return user;
}
module.exports ={
    getAllUsers,
    getUserById,
    addUser
}