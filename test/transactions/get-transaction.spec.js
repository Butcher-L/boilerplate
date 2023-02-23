const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

const TransactionModel = require('../../src/models/transaction-db');
const UserModel = require('../../src/models/user-db');

const { generateTransaction } = require('../helper/generate-transaction')
const { generateUser } = require('../helper/generate-user')
const { Transaction } = require('../../src/middlewares/types')


const server = require('../../src/index');
const jwt = require('../../src/middlewares/jwt')

chai.use(chaiHttp);

describe('Transactons', () => {
  describe('/GET ', () => {
    before(async function () { 
        this.transaction = generateTransaction()
        this.user = generateUser()

        await UserModel.create(this.user)
        this.token = await jwt.generateToken(this.user)

        await TransactionModel.create({
          ...this.transaction,
          status: Transaction.Todo,
          user: this.user._id
        })
    });
    after(async function () {
        await TransactionModel.deleteMany({});
        await UserModel.deleteMany({});
      });

    it('SHOULD get transaction successfully', async function (){
        const res = await chai.request(server)
            .get(`/transactions/get/${this.transaction._id}`)
            .set('Authorization', 'Bearer ' +  this.token)

        expect(res.status).to.be.eqls(200)
        expect(res.body).have.property('_id')
        expect(res.body).have.property('name')
        expect(res.body).have.property('status')

    });
  });
});