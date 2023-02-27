const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

const UserModel = require('../../src/models/user-db');
const {generateUser} = require('../helper/generate-user')
const server = require('../../src/index');
const jwt = require('../../src/middlewares/jwt')

chai.use(chaiHttp);

describe('Users', () => {
  describe('/PUT ', () => {
    before(async function () { 
        this.user = generateUser()
        this.user2 = generateUser()
        await UserModel.insertMany([this.user, this.user2])

        this.token = await jwt.generateToken(this.user)
        this.firstname = "TEST"
    });
    after(async function () {
        await UserModel.deleteMany({});
      });

    it('SHOULD update user successfully', async function (){
   
        const res = await chai.request(server)
            .put(`/users/update/${this.user._id}`)
            .set('Authorization', 'Bearer ' +  this.token)
            .send({ firstname: this.firstname })

        expect(res.status).to.be.eqls(200)
        expect(res.body.id).to.be.eqls(this.user._id)
    });

    it('SHOULD firstname match with the updated firstname', async function (){
      const user = await UserModel.findById(this.user._id)

      expect(user.firstname).to.be.eqls(this.firstname)
    });

    it('SHOULD not update due to existing username', async function (){
   
      const res = await chai.request(server)
          .put(`/users/update/${this.user._id}`)
          .set('Authorization', 'Bearer ' +  this.token)
          .send({ username: this.user2.username })

      expect(res.status).to.be.eqls(400)
      expect(res.body.error).to.be.eqls('User name already exists')
    });

    it('SHOULD not update due to error in username', async function (){
      const username = "test 1"
   
      const res = await chai.request(server)
          .put(`/users/update/${this.user._id}`)
          .set('Authorization', 'Bearer ' +  this.token)
          .send({ username: username })

      expect(res.status).to.be.eqls(400)
      expect(res.body.error).to.be.eqls(`Username should not have 'space'`)
    });
  });
});