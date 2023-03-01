const UserModel = require('../../models/user-db') 

const loginUseCase = ({ encrypt ,jwt }) => {
  return async function login(info){

    const userExist = await UserModel.findOne({
        username : info.username,
    })

    if (!userExist){
        throw new Error('User does not exits')
    }

    const user = await UserModel.findOne({
        username : info.username,
        passwordHash : encrypt(info.password)
    })

    if(!user){
        return{
            error: "Invalid Credentials",
            statusCode: 404,
        }
    }

    const token = await jwt.generateToken(user)

    return {
        message : 'Login successful',
        statusCode: 200,
        token: token,
    };
};
}

module.exports = loginUseCase;