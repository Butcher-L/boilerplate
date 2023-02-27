const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

const UserModel = require('../../src/models/user-db');
const {generateUser} = require('../helper/generate-user')
const server = require('../../src/index');
const { encrypt } = require('../../src/middlewares/encrypt'); 

chai.use(chaiHttp);

describe('Login', () => {
  describe('/POST ', () => {
    before(async function () { 
        this.user = generateUser()

        await UserModel.create({
          ...this.user,
          password: encrypt(this.user.password)
        })
    });
    after(async function () {
        await UserModel.deleteMany({});
      });

    it('SHOULD login successfully', async function (){
        const res = await chai.request(server)
            .post('/login/')
            .send({
              username: this.user.username,
              password: this.user.password
            })

        expect(res.status).to.be.eqls(200)
        expect(res.body).have.property('token')
    });

    it('SHOULD give error', async function (){
      const res = await chai.request(server)
          .post('/login/')
          .send({
            username: this.user.username,
            password: "test"
          })

      expect(res.status).to.be.eqls(404)
      expect(res.body.error).to.be.eqls('Invalid Credentials')
    });
  });
});