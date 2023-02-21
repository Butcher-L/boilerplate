const UserModel = require('../../models/users/user-db')
const { makeUser } = require("../../entities/users")

const addUserUseCase = ({ encrypt, generateId }) => {
    return async function add(info){
        const userEntity = makeUser(info);
        const user = await UserModel.findOne({
            firstname : info.firstname,
            lastname : info.lastname
        })
        if(user){
            throw new Error('account already exists')
        }

        const id = generateId('usr')

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