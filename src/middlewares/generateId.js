const { v4 } = require('uuid');

// list of prefix
const _prefix = {
  ["User"]: 'usr',
};

function generateId(prefix, uuid) {
  const id = uuid || v4();

  if (!prefix || prefix.length === 0) {
    return id;
  }

  return `${prefix}_${id.split('-').join('')}`;
}

module.exports = { generateId }
