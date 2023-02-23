const Chance = require('chance');
const { generateId, Prefix } = require('../../src/middlewares/generateId')

const chance = new Chance()
module.exports = {
   generateTransaction() {
    const id = generateId(Prefix.Transaction);
    return {
      _id: id,
      user: generateId(Prefix.User),
      name: chance.word(),
      dateTimeCreated: Date.now(),
      dateTimeUpdated: Date.now(),
    }
  },
}
