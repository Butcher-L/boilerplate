const mongoose = require('mongoose');
const UserPolicyModel = require('../models/user-policy-db')
require("dotenv").config();

const { generateId, Prefix } = require('../middlewares/generateId')

async function populate(){
  const uri =  process.env.NODE_ENV==='test' 
  ?  `mongodb://localhost:27017/boiler_test`
  : process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.MONGODB}` 

  mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`Connected to the database! : ${process.env.NODE_ENV==='test'? process.env.MONGODBTEST : process.env.MONGODB}`);
})
  
  const userPolicies = [
    {
      _id: generateId(Prefix.UserPolicy),
      name: "SUPER ADMIN",
      module : [
        'archieved-documents',
        'employee-self-service',
        'project-billing'
      ]
    },
    {
      _id: generateId(Prefix.UserPolicy),
      name: "ADMIN",
      module : [
        'project-billing',
        'employee-self-service',
      ]
    },
    {
      _id: generateId(Prefix.UserPolicy),
      name: "USER",
      module : [
        'employee-self-service',
      ]
    },
  ]

  try {
    await UserPolicyModel.insertMany(userPolicies)
    console.log("Done running migration")
  } catch (error) {
    return error
  }
  mongoose.connection.close()
}

return populate()


