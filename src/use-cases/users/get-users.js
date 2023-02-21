const UserModel = require('../../models/users/user-db')

const getUsersUseCase = () => {
  return async function getAll(info){

    const {first, order, limit} = info

      return UserModel.find({}).skip(limit).limit(first).sort({dateTimeCreated:order});
  };
};

module.exports = getUsersUseCase;