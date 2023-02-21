const UserModel = require('../../models/users/user-db') 
const jwt = require('../../middlewares/jwt')


const loginUseCase = ({ encrypt }) => {
  return async function login(info){

    const userExist = await UserModel.findOne({
        username : info.username,
    })

    if (!userExist){
        throw new Error('User does not exits')
    }
    const user = await UserModel.findOne({
        username : info.username,
        password : encrypt(info.password)
    })

    if(!user){
        throw new Error('Invalid Credentials')
    }

    const token = await jwt.generateToken(user)

    return {
        message : 'Login successful',
        token: token,
    };
};
}

module.exports = loginUseCase;