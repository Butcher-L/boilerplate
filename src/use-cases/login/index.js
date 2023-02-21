const { encrypt } = require('../../middlewares/encrypt')
const jwt = require('../../middlewares/jwt')

const login = require('./login');

const loginUseCase = login({ encrypt, jwt });

const controller = Object.freeze({
  loginUseCase,
});

module.exports = controller;
module.exports = {
  loginUseCase,
};