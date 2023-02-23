const {
    addUserUseCase,
    getUsersUseCase,
    updateUserUseCase,
    getUserUseCase,
    deleteUserUseCase
} = require('../../use-cases/users');

const addUser = require('./add-user');
const getUsers = require('./get-users')
const updateUser = require('./update-user')
const getUser = require('./get-user')
const deleteUser = require('./delete-user')

const addUserController = addUser({ addUserUseCase });
const getUsersController = getUsers({ getUsersUseCase });
const updateUserController = updateUser({ updateUserUseCase })
const getUserController = getUser({ getUserUseCase })
const deleteUserController = deleteUser({ deleteUserUseCase })


const usersController = Object.freeze({
    addUserController,
    getUsersController,
    updateUserController,
    getUserController,
    deleteUserController
});

module.exports = usersController;
module.exports = {
    addUserController,
    getUsersController,
    updateUserController,
    getUserController,
    deleteUserController
}