const getDocumentsUseCase = ({}) => {
  return async function get(){
    return {
      msg: `Welcome to Archieved Documents`,
    }
};
}

module.exports = getDocumentsUseCase;