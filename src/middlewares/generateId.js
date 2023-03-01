const { v4 } = require('uuid');

// list of prefix
const Prefix = {
  User: 'usr',
  Transaction: 'trn',
  Address: 'add',
  Contact: 'cnt',
  Contract: 'ctr',
  Email: 'eml',
  Geolocation: 'geo',
  Password: 'psw',
  UserPolicy: 'usp',
  Vaccine: 'vcn',
};

function generateId(prefix, uuid) {
  const id = uuid || v4();

  if (!prefix || prefix.length === 0) {
    return id;
  }

  return `${prefix}_${id.split('-').join('')}`;
}

module.exports = { generateId, Prefix }
