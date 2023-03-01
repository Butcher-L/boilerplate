const {getDocumentsUseCase} = require('../../use-cases/archieved-documents');

const getDocuments = require('./get-documents');

const getDocumentsController = getDocuments({ getDocumentsUseCase });

const controller = Object.freeze({
  getDocumentsController
});

module.exports = controller;
module.exports = {
  getDocumentsController
};
