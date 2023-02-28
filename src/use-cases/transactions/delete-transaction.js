const TransactionModel = require('../../models/transaction-db')

const deleteTransactionUseCase = ({Role}) => {
  return async function get(id, user){
    if(user.role === Role.User){
      throw new Error('No access to delete transaction')
    }

      await TransactionModel.updateOne(
        { _id: id },
        {
            deleted: true
        })
      
    return {
      msg: `Transaction ${id} is deleted`,
      id
    };
  };
};

module.exports = deleteTransactionUseCase;