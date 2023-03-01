const { getBillingsUseCase } = require('../../use-cases/project-billing');

const getBillings = require('./get-billings');

const getBillingsController = getBillings({ getBillingsUseCase });

const controller = Object.freeze({
  getBillingsController
});

module.exports = controller;
module.exports = {
  getBillingsController
};
