const mongoose = require('mongoose');
require("dotenv").config();

async function MongooseService() {
const uri =  process.env.NODE_ENV==='test' 
  ?  `mongodb://localhost:27017/boiler_test`
  : process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.MONGODB}` 
  console.log(process.env.NODE_ENV)

// Connect to the MongoDB server and the specified database using Mongoose
mongoose.connect(uri, {
   useNewUrlParser: true, 
   useUnifiedTopology: true, 
   dbName: process.env.NODE_ENV==='test'? process.env.MONGODBTEST : process.env.MONGODB })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });
}
 

module.exports = { MongooseService }