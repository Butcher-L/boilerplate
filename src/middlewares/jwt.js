const jwt = require('jsonwebtoken');
require("dotenv").config();

async function generateToken(user) {

    return jwt.sign({
        _id: user._id,
        role: user.role,
    }, process.env.SECRET,{ expiresIn: '1h' });
}


module.exports = { generateToken }
