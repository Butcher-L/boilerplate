const getBillingsUseCase = ({}) => {
  return async function get(info){
    return {
      msg: `Welcome to Project Billing`,
    }
};
}

module.exports = getBillingsUseCase;