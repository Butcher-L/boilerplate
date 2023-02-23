const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

const TransactonModel = require('../../src/models/transaction-db')
const { Transaction } = require('../../src/middlewares/types')

const UserModel = require('../../src/models/user-db');
const { generateTransaction } = require('../helper/generate-transaction')
const { generateUser } = require('../helper/generate-user')
const server = require('../../src/index');
const jwt = require('../../src/middlewares/jwt')

chai.use(chaiHttp);

describe('Transactons', () => {
  describe('/PUT ', () => {
    before(async function () { 
      this.transaction = generateTransaction()
      this.user = generateUser()
      this.name = "TEST"

      await UserModel.create(this.user)
      await TransactonModel.create({
        ...this.transaction,
        status: Transaction.Todo,
        user: this.user._id
      })

      this.token = await jwt.generateToken(this.user)
    });
    after(async function () {
        await TransactonModel.deleteMany({});
        await UserModel.deleteMany({});
      });

    it('SHOULD update transaction successfully', async function (){
      const res = await chai.request(server)
        .put(`/transactions/update/${this.transaction._id}`)
        .set('Authorization', 'Bearer ' +  this.token)
        .send({ name: this.name })

      expect(res.status).to.be.eqls(200)
      expect(res.body.id).to.be.eqls(this.transaction._id)
      expect(res.body).have.property('msg')
      expect(res.body).have.property('id')
    });

    it('SHOULD name match with the updated name in the model', async function (){
      const transaction = await TransactonModel.findById(this.transaction._id)
      expect(transaction.name).to.be.eqls(this.name)
    });

    it('SHOULD not accept invalid status', async function (){
      const status = "TESTING"
      const res = await chai.request(server)
        .put(`/transactions/update/${this.transaction._id}`)
        .set('Authorization', 'Bearer ' +  this.token)
        .send({ status })

      expect(res.status).to.be.eqls(400)
      expect(res.body.error).to.be.eqls('Invalid status')
    });
  });
});