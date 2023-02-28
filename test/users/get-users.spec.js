const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const R = require('ramda')

const UserModel = require('../../src/models/user-db');
const { Role } = require('../../src/middlewares/types')
const {generateUser} = require('../helper/generate-user')
const server = require('../../src/index');
const jwt = require('../../src/middlewares/jwt')

chai.use(chaiHttp);

describe('Users', () => {
  describe('/GET ', () => {
    before(async function () { 
        const users = R.times(() => generateUser(Role.User))(10)
        const admin = generateUser(Role.Admin)
        await UserModel.insertMany(users)
        await UserModel.insertMany(admin)

        this.token = await jwt.generateToken(admin)
    });
    after(async function () {
        await UserModel.deleteMany({});
      });

    it('SHOULD get users successfully', async function (){
        const res = await chai.request(server)
            .get('/users')
            .set('Authorization', 'Bearer ' +  this.token)

        expect(res.status).to.be.eqls(200)
        expect(res.body.length).to.be.eq(11)
    });

    it('SHOULD get users successfully with next 5 first 5 and order -1', async function (){
      const next = 5
      const first = 5
      const order = -1
      
      const res = await chai.request(server)
          .get(`/users/?next=${next}&first=${first}&order=${order}`)
          .set('Authorization', 'Bearer ' +  this.token)

      expect(res.status).to.be.eqls(200)
      expect(res.body.length).to.be.eq(5)
    });

    it('SHOULD get users successfully with next 10 first 5 and order -1', async function (){
      const next = 10
      const first = 5
      const order = -1

      const res = await chai.request(server)
          .get(`/users/?next=${next}&first=${first}&order=${order}`)
          .set('Authorization', 'Bearer ' +  this.token)

      expect(res.status).to.be.eqls(200)
      expect(res.body.length).to.be.eq(1)
    });
  });
});