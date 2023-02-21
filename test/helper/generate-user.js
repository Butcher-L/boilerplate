const Chance = require('chance');
const { generateId } = require('../../src/middlewares/generateId')

const chance = new Chance()
module.exports = {
   generateUser() {
    const id = generateId('usr');
    return {
      _id: id,
      firstname: chance.first(),
      lastname: chance.last(),
      role: "test",
      username: chance.first(),
      password: chance.word(),
      email: chance.email(),
      dateOfBirth:chance.birthday({string: true})
    }
  },
}
