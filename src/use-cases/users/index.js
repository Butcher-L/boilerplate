const { encrypt } = require('../../middlewares/encrypt')
const { generateId, Prefix } = require('../../middlewares/generateId')

const addUser = require('./add-user');
const getUsers = require('./get-users')
const updateUser = require('./update-user')
const getUser = require('./get-user')
const deleteUser = require('./delete-user')

const addUserUseCase = addUser({ encrypt, generateId, Prefix });
const getUsersUseCase = getUsers();
const updateUserUseCase = updateUser();
const getUserUseCase = getUser();
const deleteUserUseCase = deleteUser();

const usersService = Object.freeze({
    addUserUseCase,
    getUsersUseCase,
    updateUserUseCase,
    getUserUseCase,
    deleteUserUseCase
});

module.exports = usersService;
module.exports = {
    addUserUseCase,
    getUsersUseCase,
    updateUserUseCase,
    getUserUseCase,
    deleteUserUseCase
};