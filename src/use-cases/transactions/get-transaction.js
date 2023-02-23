const TransactionModel = require('../../models/transaction-db')

const getTransactionUseCase = () => {
  return async function get(id){

      return TransactionModel.findById(id)
  };
};

module.exports = getTransactionUseCase;