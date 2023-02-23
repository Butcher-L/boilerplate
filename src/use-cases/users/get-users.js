const UserModel = require('../../models/user-db')

const getUsersUseCase = () => {
  return async function getAll(info){

    const {first, order, next} = info

      return UserModel.find({}).skip(next).limit(first).sort({dateTimeCreated:order});
  };
};

module.exports = getUsersUseCase;