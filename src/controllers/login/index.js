const {loginUseCase} = require('../../use-cases/login');

const login = require('./login');

const loginController = login({ loginUseCase });

const controller = Object.freeze({
  loginController
});

module.exports = controller;
module.exports = {
  loginController
};
