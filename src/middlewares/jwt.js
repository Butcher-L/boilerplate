const jwt = require('jsonwebtoken');
const config = require('../middlewares/config');

async function generateToken(user) {

    // Set the token expiration time to 1 hour from now
    const tokenExpiration = Math.floor(Date.now() / 1000) + (60 * 60); // current time + 1 hour

    return jwt.sign({
        _id: user._id,
        role: user.role,
        exp: tokenExpiration, 
    }, config.secret);
}


module.exports = { generateToken }
