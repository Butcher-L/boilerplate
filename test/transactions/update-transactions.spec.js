const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

const TransactonModel = require('../../src/models/transaction-db')
const { Transaction, Role } = require('../../src/middlewares/types')
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
      this.transaction2 = generateTransaction()
      this.user = generateUser(Role.User)
      this.name = "TEST"

      await UserModel.create(this.user)
      await TransactonModel.insertMany([
        {
          ...this.transaction,
          status: Transaction.Todo,
          user: this.user._id
        },
        {
          ...this.transaction2,
          status: Transaction.Todo,
          user: this.user._id
        },
      ])

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

    it('SHOULD update transaction successfully with date', async function (){
      const dateTimeStarted = "2023-02-27"
      const dateTimeCompleted = "2023-02-28"

      const res = await chai.request(server)
        .put(`/transactions/update/${this.transaction._id}`)
        .set('Authorization', 'Bearer ' +  this.token)
        .send({ 
          dateTimeStarted ,
          dateTimeCompleted
        })

      const transaction = await TransactonModel.findById(this.transaction._id)
      expect(transaction.dateTimeStarted).to.be.eqls(new Date(dateTimeStarted))
      expect(transaction.dateTimeCompleted).to.be.eqls(new Date(dateTimeCompleted))

      expect(res.status).to.be.eqls(200)
      expect(res.body.id).to.be.eqls(this.transaction._id)
      expect(res.body).have.property('msg')
      expect(res.body).have.property('id')
    });

    it('SHOULD not update transaction due to error in date', async function (){
      const dateTimeStarted = "2023-02-28"
      const dateTimeCompleted = "2023-02-27"

      const res = await chai.request(server)
        .put(`/transactions/update/${this.transaction._id}`)
        .set('Authorization', 'Bearer ' +  this.token)
        .send({ 
          dateTimeStarted ,
          dateTimeCompleted
        })

      expect(res.status).to.be.eqls(400)
      expect(res.body.error).to.be.eqls('Date Started should not be greater than Date Completed')
    });

    it('SHOULD not update due to existing name', async function (){
      const res = await chai.request(server)
        .put(`/transactions/update/${this.transaction._id}`)
        .set('Authorization', 'Bearer ' +  this.token)
        .send({ name: this.transaction2.name })

      expect(res.status).to.be.eqls(400)
      expect(res.body.error).to.be.eqls('Transaction name already exists')
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