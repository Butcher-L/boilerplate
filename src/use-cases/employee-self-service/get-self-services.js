const getSelfServicesUseCase = ({}) => {
  return async function get(info){
    return {
      msg: `Welcome to Employee Self Service`,
    }
};
}

module.exports = getSelfServicesUseCase;