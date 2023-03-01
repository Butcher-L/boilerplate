const {getSelfServicesUseCase} = require('../../use-cases/employee-self-service');

const getSelfServices = require('./get-self-services');

const getSelfServicesController = getSelfServices({ getSelfServicesUseCase });

const controller = Object.freeze({
  getSelfServicesController
});

module.exports = controller;
module.exports = {
  getSelfServicesController
};
