const { encrypt } = require('../../middlewares/encrypt')
const { generateId } = require('../../middlewares/generateId')


const addUser = require('./add-user');

const addUserUseCase = addUser({ encrypt, generateId });


const usersService = Object.freeze({
    addUserUseCase,
});

module.exports = usersService;
module.exports = {
    addUserUseCase,
};