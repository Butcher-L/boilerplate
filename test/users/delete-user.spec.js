const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

const UserModel = require('../../src/models/user-db');
const {generateUser} = require('../helper/generate-user')
const server = require('../../src/index');
const jwt = require('../../src/middlewares/jwt')

chai.use(chaiHttp);

describe('Users', () => {
  describe('/DELETE ', () => {
    before(async function () { 
        this.user = generateUser()
        await UserModel.create(this.user)

        this.token = await jwt.generateToken(this.user)
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

    it('SHOULD delete the member in the model', async function (){
      const user = await UserModel.findById(this.user._id)

      expect(user).to.be.null
    });
  });
});