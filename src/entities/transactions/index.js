const makeTransactionEntity = require('./transaction-entity')

const makeTransaction = makeTransactionEntity({})

module.exports = {
  makeTransaction,
}