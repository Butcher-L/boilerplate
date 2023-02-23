const { generateId, Prefix } = require('../../middlewares/generateId')
const { TransactionType, Transaction  } = require('../../middlewares/types') 

const addTransaction = require('./add-transaction');
const updateTransaction = require('./update-transaction')
const getTransaction = require('./get-transaction')
const getTransactions = require('./get-transactions')
const deleteTransaction = require("./delete-transaction")

const addTransactionUseCase = addTransaction({ generateId, Prefix, Transaction});
const updateTransactionUseCase =  updateTransaction({ TransactionType })
const getTransactionUseCase = getTransaction({})
const getTransactionsUseCase = getTransactions({})
const deleteTransactionUseCase = deleteTransaction({})


const transactionService = Object.freeze({
  addTransactionUseCase,
  updateTransactionUseCase,
  getTransactionUseCase,
  getTransactionsUseCase,
  deleteTransactionUseCase
  
});

module.exports = transactionService;
module.exports = {
  addTransactionUseCase,
  updateTransactionUseCase,
  getTransactionUseCase,
  getTransactionsUseCase,
  deleteTransactionUseCase
};