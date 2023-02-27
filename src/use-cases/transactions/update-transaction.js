const TransactionModel = require('../../models/transaction-db')
const R = require('ramda')

const updateTransactionUseCase = ({ TransactionType }) => {
    return async function add(id,info){
      const transactionExists = await TransactionModel.findOne({_id:id})
      if(!transactionExists){
        throw new Error('Transaction does not exists')
      }

      if(info.status){
        const validStatus = R.includes(info.status, TransactionType)
        
        if(!validStatus){
          throw new Error('Invalid status')
        }
      }

      if(info.name){
        const transaction = await TransactionModel.findOne({
          ...R.pick(['name'],info)
        })

        if(transaction){
          throw new Error('Transaction name already exists')
        }
      }

      await TransactionModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set:{
            ...info,
            dateTimeUpdated: Date.now()
          }
        })
      return {
          msg: `Transaction ${id} updated successfully`,
          id
      };
    };
};

module.exports = updateTransactionUseCase;