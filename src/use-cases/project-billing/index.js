const getBillings = require('./get-billings');

const getBillingsUseCase = getBillings({});

const useCase = Object.freeze({
  getBillingsUseCase,
});

module.exports = useCase;
module.exports = {
  getBillingsUseCase,
};