const UserModel = require('../../models/users/user-db')

const deleteUserUseCase = () => {
  return async function get(id){

      return UserModel.deleteOne({_id: id})
  };
};

module.exports = deleteUserUseCase;