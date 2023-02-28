const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const R = require('ramda')

const TransactonModel = require('../../src/models/transaction-db')
const UserModel = require('../../src/models/user-db');
const { Role } = require('../../src/middlewares/types')

const { generateTransaction } = require('../helper/generate-transaction')
const { generateUser } = require('../helper/generate-user')
const jwt = require('../../src/middlewares/jwt')


const server = require('../../src/index');

chai.use(chaiHttp);

describe('Transactons', () => {
  describe('/POST ', () => {
    before(async function () { 
        this.transaction = generateTransaction()
        this.user = generateUser(Role.User)
        await UserModel.create(this.user)
        this.token = await jwt.generateToken(this.user)
    });
    after(async function () {
        await TransactonModel.deleteMany({});
        await UserModel.deleteMany({});
      });

    it('SHOULD create transaction successfully', async function (){
        const res = await chai.request(server)
            .post('/transactions/add-transaction')
            .send({
                ...R.omit(['user'],this.transaction),
                user: this.user._id
            })
            .set('Authorization', 'Bearer ' +  this.token)

        expect(res.status).to.be.eqls(201)
        expect(res.body).have.property('msg')
        expect(res.body).have.property('id')

    });

    it('SHOULD create transaction in the model', async function () {
        const transaction = await TransactonModel.findOne({
            name : this.transaction.name,
            user : this.user._id
        })

        expect(transaction.name).to.be.eqls(this.transaction.name)
        expect(transaction.user).to.be.eqls(this.user._id)
    });

    it('SHOULD give error ', async function (){
        const res =  await chai.request(server)
            .post('/transactions/add-transaction')
            .send({
                ...this.transaction,
                user: this.user._id
            })
            .set('Authorization', 'Bearer ' +  this.token)

        expect(res.status).to.be.eqls(400)
        expect(res.body.error).to.be.eqls('Transaction already exists')
    });
  });
});