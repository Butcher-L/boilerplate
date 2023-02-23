const UserModel = require('../../models/users/user-db')

const updateUserUseCase = () => {
    return async function add(id,info){
      const userExists = await UserModel.findOne({_id:id})
      if(!userExists){
          throw new Error('Account does not exists')
      }

      await UserModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set:{
            ...info,
            dateTimeUpdated: Date.now()
          }
        })
      return {
          msg: `User ${id} updated successfully`,
          id
      };
    };
};

module.exports = updateUserUseCase;