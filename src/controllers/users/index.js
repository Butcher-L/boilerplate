const {
    addUserUseCase,
    addUserSAPUseCase
} = require('../../use-cases/users');

const addUser = require('./add-user');

const addUserController = addUser({ addUserUseCase });

const usersController = Object.freeze({
    addUserController,
});

module.exports = usersController;
module.exports = {
    addUserController,
}