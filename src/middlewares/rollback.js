const AddressModel = require('../models/address-db')
const ContractModel = require('../models/contract-db')
const ContactModel = require('../models/contact-db')
const EmailModel = require('../models/email-db')
const GeolocationModel = require('../models/geolocation-db')
const PasswordModel = require('../models/password-db')
const TransactionModel = require('../models/transaction-db')
const UserModel = require('../models/user-db')
const UserPolicyModel = require('../models/user-policy-db')
const Vaccine = require('../models/vaccine-db')

async function Rollback(info) {
  for await(db of info) {
    const { model,id } = db
    if(model === PasswordModel){
      await PasswordModel.deleteOne({_id:id})
      console.log(`Rolling back password model for id: ${id}`)
    }
    if(model === GeolocationModel){
      await GeolocationModel.deleteOne({_id:id})
      console.log(`Rolling back geolocation model for id: ${id}`)
    }
    if(model === AddressModel){
      await AddressModel.deleteOne({_id:id})
      console.log(`Rolling back address model for id: ${id}`)
    }
    if(model === ContractModel){
      await ContractModel.deleteOne({_id:id})
      console.log(`Rolling back contract model for id: ${id}`)
    }
    if(model === ContactModel){
      await ContactModel.deleteOne({_id:id})
      console.log(`Rolling back contact model for id: ${id}`)
    }
    if(model === EmailModel){
      await EmailModel.deleteOne({_id:id})
      console.log(`Rolling back email model for id: ${id}`)
    }
    if(model === TransactionModel){
      await TransactionModel.deleteOne({_id:id})
      console.log(`Rolling back transaction model for id: ${id}`)
    }
    if(model === UserModel){
      await UserModel.deleteOne({_id:id})
      console.log(`Rolling back user model for id: ${id}`)
    }
    if(model === UserPolicyModel){
      await UserPolicyModel.deleteOne({_id:id})
      console.log(`Rolling back user policy model for id: ${id}`)
    }
    if(model === Vaccine){
      await Vaccine.deleteOne({_id:id})
      console.log(`Rolling back vaccine model for id: ${id}`)
    }
  }
  console.log("Rollback complete")
}

module.exports = {
  Rollback
};