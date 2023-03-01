const getDocuments = require('./get-documents');

const getDocumentsUseCase = getDocuments({});

const useCase = Object.freeze({
  getDocumentsUseCase,
});

module.exports = useCase;
module.exports = {
  getDocumentsUseCase,
};