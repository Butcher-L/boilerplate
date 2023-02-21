const { encrypt } = require('../../middlewares/encrypt')
const { generateId } = require('../../middlewares/generateId')


const addUser = require('./add-user');
const getUsers = require('./get-users')

const addUserUseCase = addUser({ encrypt, generateId });
const getUsersUseCase = getUsers();



const usersService = Object.freeze({
    addUserUseCase,
    getUsersUseCase
});

module.exports = usersService;
module.exports = {
    addUserUseCase,
    getUsersUseCase
};