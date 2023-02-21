const jwt = require('jsonwebtoken');
const config = require('../middlewares/config');

async function generateToken(user) {
    return jwt.sign({
        _id: user._id,
        role: user.role
    }, config.secret);
}


module.exports = { generateToken }
