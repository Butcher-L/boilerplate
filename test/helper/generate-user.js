const Chance = require('chance');
const { generateId, Prefix } = require('../../src/middlewares/generateId')

const chance = new Chance()
module.exports = {
   generateUser() {
    const id = generateId(Prefix.User);
    return {
      _id: id,
      firstname: chance.first(),
      lastname: chance.last(), 
      role: "test",
      username: chance.first(),
      password: chance.word(),
      email: chance.email(),
      dateOfBirth:chance.birthday({string: true}),
      dateTimeCreated: Date.now(),
      dateTimeUpdated: Date.now(),
    }
  },
}
