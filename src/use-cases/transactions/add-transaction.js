const TransactionModel = require('../../models/transaction-db')
const { makeTransaction } = require("../../entities/transactions")

const addTransactionUseCase = ({generateId, Prefix, Transaction, Role}) => {
    return async function add(info,user){
        const transactionEntity = makeTransaction(info);
        const transaction = await TransactionModel.findOne({
            name : info.name,
            user: info.user,
            status: Transaction.Todo,
        })
        if(transaction){
            throw new Error('Transaction already exists')
        }

        if(user.role === Role.Admin && !info.user){
            throw new Error('Transaction must have a user')
        }

        const id = generateId(Prefix.Transaction)

        await TransactionModel.create({
            ...info,
            user: user.role === Role.User ? user._id : info.user,
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