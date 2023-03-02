const R = require('ramda')

const getBillingsUseCase = ({}) => {
  return async function get(){
    return {
      msg: `Welcome to Project Billing`,
    }
};
}

module.exports = getBillingsUseCase;