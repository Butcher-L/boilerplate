const UserModel = require('../../models/user-db')

const getUserUseCase = () => {
  return async function get(id){

      return UserModel.findById(id)
  };
};

module.exports = getUserUseCase;