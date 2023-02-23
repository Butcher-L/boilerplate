const {
  addTransactionUseCase,
  updateTransactionUseCase,
  getTransactionUseCase,
  getTransactionsUseCase,
  deleteTransactionUseCase
} = require('../../use-cases/transactions');

const addTransaction = require('./add-transaction');
const updateTransaction = require('./update-transaction')
const getTransaction = require('./get-transaction')
const getTransactions = require('./get-transactions')
const deleteTransaction = require('./delete-transaction')

const addTransactionController = addTransaction({ addTransactionUseCase });
const updateTransactionController = updateTransaction({ updateTransactionUseCase });
const getTransactionController = getTransaction({ getTransactionUseCase })
const getTransactionsController = getTransactions({ getTransactionsUseCase })
const deleteTransactionController = deleteTransaction({ deleteTransactionUseCase })

const transactionController = Object.freeze({
  addTransactionController,
  updateTransactionController,
  getTransactionController,
  getTransactionsController,
  deleteTransactionController
});

module.exports = transactionController;
module.exports = {
  addTransactionController,
  updateTransactionController,
  getTransactionController,
  getTransactionsController,
  deleteTransactionController
}