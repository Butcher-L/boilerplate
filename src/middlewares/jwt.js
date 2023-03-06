const jwt = require('jsonwebtoken');
const R = require('ramda')

const UserPolicyModel = require('../models/user-policy-db')
require("dotenv").config();

async function generateToken(user) {

    const policy = await UserPolicyModel.findById(user.userPolicy)

    return jwt.sign({
        _id: user._id,
        role: user.role,
        userPolicy: R.omit(['_id','__v'], (policy.toJSON())),
    }, process.env.SECRET,{ expiresIn: '1h' });
}


module.exports = { generateToken }
