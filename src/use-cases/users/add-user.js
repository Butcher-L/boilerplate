const R = require('ramda')
const UserModel = require('../../models/user-db')
const PasswordModel = require('../../models/password-db')
const GeolocationModel = require('../../models/geolocation-db')
const AddressModel = require('../../models/address-db')
const EmailModel = require('../../models/email-db')
const ContractModel = require('../../models/contract-db')
const ContactModel = require('../../models/contact-db')
const VaccineModel = require('../../models/vaccine-db')
const { Rollback } = require('../../middlewares/rollback')

const { makeUser } = require("../../entities/users")

const addUserUseCase = ({ 
    encrypt, 
    generateId , 
    Prefix, 
    JobRoleType, 
    VaccineType, 
    VaccineStatusType,
    TeamsType
}) => {
    return async function add(info){
        const userEntity = makeUser(info);       

        const username = await UserModel.findOne({
            username : info.username,
        })

        if(username){
            throw new Error('Username already exists')
        }

        if(info.jobRole){
            const validJobRole = R.includes(info.jobRole, JobRoleType)
            
            if(!validJobRole){
              throw new Error('Invalid Job Role')
            }
        }

        if(info.teams){
            for ( team of info.teams){
              const validTeam = R.includes(team, TeamsType)
      
              if(!validTeam){
                throw new Error(`${team} is Invalid Team`)
              }
            }
          }

        const userId = generateId(Prefix.User)

        const password = await PasswordModel.create({
            _id: generateId(Prefix.Password),
            user: userId,
            password: info.password,
            passwordHash: encrypt(info.password),
            lastChangePassword: info.password,
            lastChangePasswordDate:  Date.now(),
        })

        if(!password){
            await Rollback([{
                model: PasswordModel,
                id: password._id
            }])
            throw new Error('Error in creating password')
        }

        const geolocation = await GeolocationModel.create({
            ...info.geolocation,
            _id: generateId(Prefix.Geolocation),
            user: userId,
        })

        if(!geolocation){
            await Rollback([
                {
                    model: PasswordModel,
                    id: password._id
                },
                {
                    model: GeolocationModel,
                    id: geolocation._id
                },
            ])
            throw new Error('Error in creating geolocation')
        }

        const address = await AddressModel.create({
            ...info.address,
            _id: generateId(Prefix.Address),
            user: userId,
        })

        if(!address){
            await Rollback([
                {
                    model: PasswordModel,
                    id: password._id
                },
                {
                    model: GeolocationModel,
                    id: geolocation._id
                },
                {
                    model: AddressModel,
                    id: address._id
                },
            ])
            throw new Error('Error in creating address')
        }

        const email = await EmailModel.create({
            ...info.email,
            _id: generateId(Prefix.Email),
            user: userId,
        })

        if(!email){
            await Rollback([
                {
                    model: PasswordModel,
                    id: password._id
                },
                {
                    model: GeolocationModel,
                    id: geolocation._id
                },
                {
                    model: AddressModel,
                    id: address._id
                },
                {
                    model: EmailModel,
                    id: email._id
                },
            ])
            throw new Error('Error in creating email')
        }

        const contract = await ContractModel.create({
            ...info.contract,
            _id: generateId(Prefix.Contract),
            user: userId,
        })

        if(!contract){
            await Rollback([
                {
                    model: PasswordModel,
                    id: password._id
                },
                {
                    model: GeolocationModel,
                    id: geolocation._id
                },
                {
                    model: AddressModel,
                    id: address._id
                },
                {
                    model: EmailModel,
                    id: email._id
                },
                {
                    model: ContractModel,
                    id: contract._id
                },
            ])
            throw new Error('Error in creating contract')
        }

        const contact = await ContactModel.create({
            ...info.contact,
            _id: generateId(Prefix.Contact),
            user: userId,
        })

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
          
            vaccine = await VaccineModel.create({
                ...info.vaccine,
                _id: generateId(Prefix.Vaccine),
                user: userId,
            })

            if(!vaccine){
                await Rollback([
                    {
                        model: PasswordModel,
                        id: password._id
                    },
                    {
                        model: GeolocationModel,
                        id: geolocation._id
                    },
                    {
                        model: AddressModel,
                        id: address._id
                    },
                    {
                        model: EmailModel,
                        id: email._id
                    },
                    {
                        model: ContractModel,
                        id: contract._id
                    },
                    {
                        model: ContactModel,
                        id: contact._id
                    },
                    {
                        model: VaccineModel,
                        id: vaccine._id
                    },
                ])
                throw new Error('Error in creating vaccine')
            }
        }
        
        await UserModel.create({
            ...info,
            _id:userId,
            fullname: `${info.firstname} ${info.middlename ? info.middlename : ``} ${info.lastname}`,
            passwordHash: encrypt(info.password),
            password: password._id, 
            geolocation: geolocation._id,
            address: address._id,
            email: email._id,
            contract: contract._id,
            contact: contact._id,
            ...( !R.isNil(vaccine) ?{vaccine: vaccine._id}  : {}),
            dateTimeCreated: Date.now(),
            dateTimeUpdated: Date.now(),
        })
        return {
            msg: `User ${userEntity.getFirstname()} added successfully`,
            userId
        };
    };
};

module.exports = addUserUseCase;