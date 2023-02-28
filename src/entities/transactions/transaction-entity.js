const makeTransactionEntity = ({}) => {
  return function makeTransaction({
    name,  
  }){

      if(!name){
          throw new Error('Transaction must have name');
      }
    
      return Object.freeze({
          getName: () => name,
      })

  }
};

module.exports = makeTransactionEntity;