const TransactionModel = require('../../models/transaction-db')

const deleteTransactionUseCase = () => {
  return async function get(id, info){

    const transaction = await TransactionModel.findOne({
      _id: id,
      user: info.user
    })

    if(!transaction) {
      throw new Error('Not Authorize to delete')
    }

      return TransactionModel.deleteOne({_id: id})
  };
};

module.exports = deleteTransactionUseCase;