const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

const UserModel = require('../../src/models/users/user-db');
const {generateUser} = require('../helper/generate-user')
const server = require('../../src/index');

chai.use(chaiHttp);

describe('Users', () => {
  describe('/POST ', () => {
    before(async function () { 
        this.user = generateUser()
    });
    after(async function () {
        await UserModel.deleteMany({});
      });

    it('SHOULD create user successfully', async function (){
        const res = await chai.request(server)
            .post('/users/add-user')
            .send(this.user)

        expect(res.status).to.be.eqls(201)
    });

    it('SHOULD create user in the model', async function () {
        const user = await UserModel.findOne({
            firstname : this.user.firstname,
            lastname : this.user.lastname
        })

        expect(user.firstname).to.be.eqls(this.user.firstname)
        expect(user.lastname).to.be.eqls(this.user.lastname)
    });

    it('SHOULD give error ', async function (){
        const res =  await chai.request(server)
            .post('/users/add-user')
            .send(this.user)

        expect(res.status).to.be.eqls(400)
        expect(res.body.error).to.be.eqls('account already exists')
    });
  });
});