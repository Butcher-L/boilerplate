const makeTransactionEntity = ({}) => {
  return function makeTransaction({
    name, user, 
  }){

      if(!name){
          throw new Error('Transaction must have name');
      }

      if(!user){
        throw new Error('Transaction must have user');
      }
    
      return Object.freeze({
          getName: () => name,
          getUser: () => user,
      })

  }
};

module.exports = makeTransactionEntity;