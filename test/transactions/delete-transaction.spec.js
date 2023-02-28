const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

const UserModel = require('../../src/models/user-db');
const TransactionModel = require('../../src/models/transaction-db')
const { Transaction, Role } = require('../../src/middlewares/types')

const { generateUser } = require('../helper/generate-user')
const { generateTransaction} = require('../helper/generate-transaction')

const server = require('../../src/index');
const jwt = require('../../src/middlewares/jwt')


chai.use(chaiHttp);

describe('Transactions', () => {
  describe('/DELETE ', () => {
    before(async function () { 
        this.transaction = generateTransaction()
        this.user = generateUser(Role.User)
        this.admin = generateUser(Role.Admin)

        await UserModel.create(this.user)
        await UserModel.create(this.admin)

        this.token = await jwt.generateToken(this.admin)
        this.invalidToken = await jwt.generateToken(this.user)


        await TransactionModel.create({
          ...this.transaction,
          status: Transaction.Todo,
          user: this.user._id
        })
    });
    after(async function () {
        await UserModel.deleteMany({});
        await TransactionModel.deleteMany({});

      });
    it('SHOULD give error in delete transaction', async function (){
        const res = await chai.request(server)
            .delete(`/transactions/delete/${this.transaction._id}`)
            .send({
              user:this.user._id
          })
            .set('Authorization', 'Bearer ' +  this.invalidToken)
        expect(res.status).to.be.eqls(400)
        expect(res.body.error).to.be.eqls('No access to delete transaction')
    });

    it('SHOULD delete transaction successfully', async function (){
        const res = await chai.request(server)
            .delete(`/transactions/delete/${this.transaction._id}`)
            .send({
              user: this.user._id
          })
            .set('Authorization', 'Bearer ' +  this.token)
        
        expect(res.status).to.be.eqls(200)
    });
  });
});