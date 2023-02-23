const UserModel = require('../../models/user-db')
const { makeUser } = require("../../entities/users")

const addUserUseCase = ({ encrypt, generateId , Prefix}) => {
    return async function add(info){
        const userEntity = makeUser(info);
        const user = await UserModel.findOne({
            firstname : info.firstname,
            lastname : info.lastname
        })
        if(user){
            throw new Error('Account already exists')
        }
        const username = await UserModel.findOne({
            username : info.username,
        })

        if(username){
            throw new Error('username already exists')
        }
    

        const id = generateId(Prefix.User)

        await UserModel.create({
            ...info,
            _id:id,
            password: encrypt(info.password), 
            dateTimeCreated: Date.now(),
            dateTimeUpdated: Date.now(),
        })
        return {
            msg: `User ${userEntity.getFirstname()} added successfully`,
            id
        };
    };
};

module.exports = addUserUseCase;