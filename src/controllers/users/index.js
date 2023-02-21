const {
    addUserUseCase,
    getUsersUseCase
} = require('../../use-cases/users');

const addUser = require('./add-user');
const getUsers = require('./get-users')

const addUserController = addUser({ addUserUseCase });
const getUsersController = getUsers({ getUsersUseCase });


const usersController = Object.freeze({
    addUserController,
    getUsersController
});

module.exports = usersController;
module.exports = {
    addUserController,
    getUsersController
}