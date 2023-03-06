const R = require('ramda')
const UserModel = require('../../models/user-db')
const PasswordModel = require('../../models/password-db')
const GeolocationModel = require('../../models/geolocation-db')
const AddressModel = require('../../models/address-db')
const EmailModel = require('../../models/email-db')
const ContractModel = require('../../models/contract-db')
const ContactModel = require('../../models/contact-db')
const VaccineModel = require('../../models/vaccine-db')
const UserPolicyModel = require('../../models/user-policy-db')

const updateUserUseCase = ({
  encrypt,
  JobRoleType, 
  VaccineType, 
  VaccineStatusType,
  TeamsType
}) => {
  return async function add(id,info){

    const userExists = await UserModel.findOne({_id: id})

    if(!userExists){
        throw new Error('Account does not exists')
    }

    if(info.username){
      const user = await UserModel.findOne({
        ...R.pick(['username'],info)
      })

      if(user){
        throw new Error('User name already exists')
      }

      if (info.username.includes(' ')){
        throw new Error(`Username should not have 'space'`)
      }
    }

    if(info.jobRole){
      const validJobRole = R.includes(info.jobRole, JobRoleType)
      
      if(!validJobRole){
        throw new Error('Invalid Job Role')
      }
    }

    if(info.userPolicy){
      const policy = await UserPolicyModel.findOne({_id: info.userPolicy })
      
      if(!policy){
        throw new Error('Policy is Invalid')
      }
    }

    let password
    if(info.password){
        const lastPassword = await PasswordModel.findOne({
          user: id,
        })

        password = await PasswordModel.findOneAndUpdate(
            { user: id},
            {
              $set : {
                password: info.password,
                passwordHash: encrypt(info.password),
                lastChangePassword: lastPassword.password,
                lastChangePasswordDate: Date.now()
              }
            },
            { returnOriginal: false }
          )
    }

    let geolocation
    if(info.geolocation){
        geolocation = await GeolocationModel.findOneAndUpdate(
            { user: id },
            { $set: info.geolocation },
            { returnOriginal: false }
          )
    }

    let address
    if(info.address){
        address = await AddressModel.findOneAndUpdate(
            { user: id },
            { $set: info.address },
            { returnOriginal: false }
          )
    }

    let email
    if(info.email){
      email = await EmailModel.findOneAndUpdate(
            { user: id },
            { $set: info.email },
            { returnOriginal: false }
          )
    }

    let contract
    if(info.contract){
      contract = await ContractModel.findOneAndUpdate(
            { user: id },
            { $set: info.contract },
            { returnOriginal: false }
          )
    }

    let contact
    if(info.contact){
      contact = await ContactModel.findOneAndUpdate(
            { user: id },
            { $set: info.contact },
            { returnOriginal: false }
          )
    }

    let vaccine
    if(info.vaccine){
      const validVaccine = R.includes(info.vaccine.vaccineType, VaccineType)
          
      if(!validVaccine){
          throw new Error('Invalid Vaccine')
      }

      const validVaccinationStatus = R.includes(info.vaccine.vaccinationStatus, VaccineStatusType)
      
      if(!validVaccinationStatus){
          throw new Error('Invalid Vaccination Status')
      }

      vaccine = await VaccineModel.findOneAndUpdate(
            { user: id },
            { $set: info.vaccine },
            { returnOriginal: false }
          )
    }

    if(info.teams){
      for ( team of info.teams){
        const validTeam = R.includes(team, TeamsType)

        if(!validTeam){
          throw new Error(`${team} is Invalid Team`)
        }
      }
    }

    const data = {
      ...info,
      ...( !R.isNil(password) 
        ? { 
            password: password._id,
            passwordHash: encrypt(info.password)
          }  : {}),
      ...( !R.isNil(geolocation) ? { geolocation: geolocation._id }  : {}),
      ...( !R.isNil(address) ? { address: address._id }  : {}),
      ...( !R.isNil(email) ? { email: email._id }  : {}),
      ...( !R.isNil(contract) ? { contract: contract._id }  : {}),
      ...( !R.isNil(contact) ? { contact: contact._id }  : {}),
      ...( !R.isNil(vaccine) ? { vaccine: vaccine._id }  : {}),
    }

    await UserModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set:{
          ...data,
          dateTimeUpdated: Date.now()
        }
      })
    return {
        msg: `User ${id} updated successfully`,
        id
    };
  };
};

module.exports = updateUserUseCase;