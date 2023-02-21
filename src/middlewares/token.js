const jwt = require('jsonwebtoken');

async function makeToken(employeeId) {
  const token = await jwt.sign({ employeeId }, 'secret');
  return token;
}

const employeeDb = require('../data-access/employees/');

async function getAuthorization(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
}

async function verifyToken(token, key, employee_id) {
  return await jwt.verify(token, key, async (err, authData) => {
    if (err) {
      return false;
    } else {
      const tokenExist = await employeeDb.checkToken(employee_id, token);
      if (!tokenExist.rowCount) {
        return false;
      }

      return true;
    }
  });
}

async function verifyTokenUpload(token, key) {
  return await jwt.verify(token, key, async (err, authData) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
}

module.exports = {
  makeToken,
  getAuthorization,
  verifyToken,
  verifyTokenUpload
};
