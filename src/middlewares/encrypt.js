require("dotenv").config();
const crypto = require('crypto'),
  algorithm = process.env.ALGORITHM,
  password = process.env.PASSWORD,
  // do not use a global iv for production,
  // generate a new one for each encryption
  iv = process.env.IV;

function encrypt(text) {
  var cipher = crypto.createCipheriv(algorithm, password, iv);
  var encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  var tag = cipher.getAuthTag();
  return encrypted;
}

function decrypt(encrypted) {
  var decipher = crypto.createDecipheriv(algorithm, password, iv);
  var dec = decipher.update(encrypted, "hex", "utf8");
  return dec;
}

module.exports = { encrypt, decrypt };
