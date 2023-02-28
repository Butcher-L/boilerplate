const UserModel = require('../../models/user-db')

const deleteUserUseCase = ({Role}) => {
  return async function get(id,user){
    if(user.role === Role.User){
      throw new Error('No access to delete user')
    }

    await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          deleted: true
        }
      })
    
    return {
      msg: `User ${id} is deleted`,
      id
    };
    
  };
};

module.exports = deleteUserUseCase;