const { encrypt } = require('../../middlewares/encrypt')
const { generateId, Prefix } = require('../../middlewares/generateId')
const { Role } = require('../../middlewares/types')

const addUser = require('./add-user');
const getUsers = require('./get-users')
const updateUser = require('./update-user')
const getUser = require('./get-user')
const deleteUser = require('./delete-user')

const addUserUseCase = addUser({ encrypt, generateId, Prefix });
const getUsersUseCase = getUsers({ Role });
const updateUserUseCase = updateUser({encrypt});
const getUserUseCase = getUser();
const deleteUserUseCase = deleteUser({ Role });

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