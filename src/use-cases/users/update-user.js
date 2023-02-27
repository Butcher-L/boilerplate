const R = require('ramda')
const UserModel = require('../../models/user-db')

const updateUserUseCase = ({encrypt}) => {
    return async function add(id,info){

      const userExists = await UserModel.findOne({_id: id})

      if(!userExists){
          throw new Error('Account does not exists')
      }

      if(info.username){
        const user = await UserModel.findOne({
          ...R.pick(['username'],info)
        })

        if(user){
          throw new Error('User name already exists')
        }

        if (info.username.includes(' ')){
          throw new Error(`Username should not have 'space'`)
      }

      }

      const data = {
        ...info,
        ...info.password ? {password :encrypt(info.password)} : {}
      }

      await UserModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set:{
            ...data,
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