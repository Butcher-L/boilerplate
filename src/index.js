const express = require('express');
const path = require('path');
const cors = require('cors');
require("dotenv").config();
const { MongooseService } = require('./middlewares/mongo/mongoose'); 

const loginRouter = require('./routes/api/login')
const usersRouter = require('./routes/api/user');
const transactionRouter = require('./routes/api/transactions')
const archievedDocumentsRouter = require('./routes/api/services/archieved-documents')
const employeeSelfServicesRouter = require('./routes/api/services/employee-self-service')
const projectBillingsRouter = require('./routes/api/services/project-billing')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/transactions', transactionRouter);
app.use('/archieved-documents', archievedDocumentsRouter)
app.use('/employee-self-services', employeeSelfServicesRouter)
app.use('/project-billings', projectBillingsRouter)


const PORT = process.env.PORT || 3000;

async function Connect() {
  const connect = MongooseService();
  return connect;
}


app.listen(PORT, async () => {
  await Connect()

  console.log(`Server is listening on port ${PORT}.`);
});

console.log(`Server is connecting to db: ${ process.env.NODE_ENV==='test'? process.env.MONGODBTEST : process.env.MONGODB}.`);

module.exports = app;
