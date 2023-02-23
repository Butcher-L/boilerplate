const TransactionModel = require('../../models/transaction-db')
const { makeTransaction } = require("../../entities/transactions")

const addTransactionUseCase = ({generateId, Prefix, Transaction}) => {
    return async function add(info){
        const transactionEntity = makeTransaction(info);
        const transaction = await TransactionModel.findOne({
            name : info.name,
            user: info.user,
            status: Transaction.Todo,
        })
        if(transaction){
            throw new Error('Transaction already exists')
        }

        const id = generateId(Prefix.Transaction)

        await TransactionModel.create({
            ...info,
            _id:id,
            status: Transaction.Todo,
            dateTimeCreated: Date.now(),
            dateTimeUpdated: Date.now(),
        })
        return {
            msg: `Transaction ${transactionEntity.getName()} created successfully`,
            id
        };
    };
};

module.exports = addTransactionUseCase;