const TransactionModel = require('../../models/transaction-db')

const getTransactionsUseCase = () => {
  return async function getAll(info){

    const {first, order, next, user} = info

      return TransactionModel.find({
        ...user ? ({ user }) : {}
      })
      .skip(next)
      .limit(first)
      .sort({dateTimeCreated:order});
  };
};

module.exports = getTransactionsUseCase;