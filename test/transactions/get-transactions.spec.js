const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const R = require('ramda')

const UserModel = require('../../src/models/user-db');
const TransactionModel = require('../../src/models/transaction-db')
const { Transaction } = require('../../src/middlewares/types')
const {generateUser} = require('../helper/generate-user')
const {generateTransaction} = require('../helper/generate-transaction')

const server = require('../../src/index');
const jwt = require('../../src/middlewares/jwt')

chai.use(chaiHttp);

describe('Transactions', () => {
  describe('/GET ', () => {
    before(async function () { 
        this.user = generateUser()
        const transactions = R.times(() => ({
          ...generateTransaction(),
          status: Transaction.Todo,
          user: this.user._id
        }))(10)

        await TransactionModel.insertMany(transactions)
        await UserModel.create(this.user)

        this.token = await jwt.generateToken(this.user)
    });
    after(async function () {
        await UserModel.deleteMany({});
        await TransactionModel.deleteMany({});
      });

    it('SHOULD get transactions successfully', async function (){
        const res = await chai.request(server)
            .get('/transactions/')
            .set('Authorization', 'Bearer ' +  this.token)

        expect(res.status).to.be.eqls(200)
        expect(res.body.length).to.be.eq(10)
    });

    it('SHOULD get transactions successfully with next 5, first 5, order -1 and specified user', async function (){
      const next = 5
      const first = 5
      const order = -1
      const user = this.user._id
      
      const res = await chai.request(server)
          .get(`/transactions/?next=${next}&first=${first}&order=${order}&user=${user}`)
          .set('Authorization', 'Bearer ' +  this.token)

      expect(res.status).to.be.eqls(200)
      expect(res.body.length).to.be.eq(5)
    });

    it('SHOULD get transactions successfully with next 5 first 5 and order -1', async function (){
      const next = 5
      const first = 5
      const order = -1
      
      const res = await chai.request(server)
          .get(`/transactions/?next=${next}&first=${first}&order=${order}`)
          .set('Authorization', 'Bearer ' +  this.token)

      expect(res.status).to.be.eqls(200)
      expect(res.body.length).to.be.eq(5)
    });

    it('SHOULD get transactions successfully with next 10 first 5 and order -1', async function (){
      const next = 10
      const first = 5
      const order = -1

      const res = await chai.request(server)
          .get(`/transactions/?next=${next}&first=${first}&order=${order}`)
          .set('Authorization', 'Bearer ' +  this.token)

      expect(res.status).to.be.eqls(200)
      expect(res.body.length).to.be.eq(0)
    });
  });
});