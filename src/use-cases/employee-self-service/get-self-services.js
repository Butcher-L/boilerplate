const getSelfServicesUseCase = ({}) => {
  return async function get(){
    return {
      msg: `Welcome to Employee Self Service`,
    }
};
}

module.exports = getSelfServicesUseCase;