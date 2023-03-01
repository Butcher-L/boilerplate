const getSelfServices = require('./get-self-services');

const getSelfServicesUseCase = getSelfServices({});

const useCase = Object.freeze({
  getSelfServicesUseCase,
});

module.exports = useCase;
module.exports = {
  getSelfServicesUseCase,
};