const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

const UserModel = require('../../src/models/user-db');
const { Role } = require('../../src/middlewares/types')

const {generateUser} = require('../helper/generate-user')

const server = require('../../src/index');
const jwt = require('../../src/middlewares/jwt')

chai.use(chaiHttp);

describe('Users', () => {
  describe('/DELETE ', () => {
    before(async function () { 
        this.user = generateUser(Role.User)
        this.admin = generateUser(Role.Admin)
        await UserModel.insertMany([this.user,this.admin])

        this.token = await jwt.generateToken(this.admin)
        this.invalidToken = await jwt.generateToken(this.user)
    });
    after(async function () {
        await UserModel.deleteMany({});
      });

    it('SHOULD delete user successfully', async function (){
        const res = await chai.request(server)
            .delete(`/users/delete/${this.user._id}`)
            .set('Authorization', 'Bearer ' +  this.token)
        expect(res.status).to.be.eqls(200)
    });

    it('SHOULD not delete user', async function (){
      const res = await chai.request(server)
          .delete(`/users/delete/${this.user._id}`)
          .set('Authorization', 'Bearer ' +  this.invalidToken)
      expect(res.status).to.be.eqls(400)
      expect(res.body.error).to.be.eqls('No access to delete user')
  });
  });
});