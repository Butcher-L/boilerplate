const UserModel = require('../../models/users/user-db')

const getUserUseCase = () => {
  return async function get(id){

      return UserModel.findById(id)
  };
};

module.exports = getUserUseCase;