const R = require('ramda')
const UserModel = require('../../models/user-db')
const PasswordModel = require('../../models/password-db')
const GeolocationModel = require('../../models/geolocation-db')
const AddressModel = require('../../models/address-db')
const EmailModel = require('../../models/email-db')
const ContractModel = require('../../models/contract-db')
const ContactModel = require('../../models/contact-db')
const VaccineModel = require('../../models/vaccine-db')

const getUsersUseCase = () => {
  return async function getAll(info){

    const {first, order, next} = info

      const users = await UserModel.find({})
      .skip(next)
      .limit(first)
      .sort({dateTimeCreated:order})

      return Promise.all(
        R.map(async (user) => {

          const password = await PasswordModel.findById(user.password)
          const geolocation = await GeolocationModel.findById(user.geolocation)
          const address = await AddressModel.findById(user.address)
          const email = await EmailModel.findById(user.email)
          const contract = await ContractModel.findById(user.contract)
          const contact = await ContactModel.findById(user.contact)
          
          let vaccine
          if(user.vaccine){
            vaccine = await VaccineModel.findById(user.vaccine)
          }

          return {
            ...R.omit(['passwordHash','__v'],(user.toJSON())),
            password:R.pick(['lastChangePassword','lastChangePasswordDate'], password),
            geolocation: R.pick(['pin','gmapAddressLink'], geolocation),
            address: R.omit(['_id','user','__v'], (address.toJSON())),
            email: R.omit(['_id','user','__v'], (email.toJSON())),
            contract: R.omit(['_id','user','__v'], (contract.toJSON())),
            contact: R.omit(['_id','user','__v'], (contact.toJSON())),
            ...( 
              !R.isNil(vaccine) 
              ? {vaccine: R.omit(['_id','user','__v'], (vaccine.toJSON()))}  
              : {}
            ),

          }
        },users)
      )
  };
};

module.exports = getUsersUseCase;