const getDocumentsUseCase = ({}) => {
  return async function get(){
    console.log("USECASE")
    return {
      msg: `Welcome to Archieved Documents`,
    }
};
}

module.exports = getDocumentsUseCase;