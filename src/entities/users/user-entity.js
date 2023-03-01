const R = require('ramda')
const { RoleType } = require('../../middlewares/types')
const makeUserEntity = ({}) => {

    return function makeUserAccount({
     firstname, 
     lastname, 
     middlename, 
     role, 
     username, 
     password, 
     email, 
     dateOfBirth,
     address,
     contract,
     mobile,
     geolocation,
     jobRole,
     contact,
    }){

        if(!firstname){
            throw new Error('User must have firstname');
        }
        if(!lastname){
            throw new Error('User must have lastname');
        }
        if(!role){
            throw new Error('User must have role');
        }
        if(role){
            const validRole = R.includes(role, RoleType)
        
            if(!validRole){
              throw new Error('Invalid role')
            }
        }
        if(username){
            if(!username){
                throw new Error('User must have username');
            }
            if (username.includes(' ')){
                throw new Error(`Username should not have 'space'`)
            }
        }
        if(!password){
            throw new Error('User must have password');
        }
        if(!email.email){
            throw new Error('User must have Email');
        }
        if(email.email){
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!regex.test(email.email)){
                throw new Error('Email is invalid');
            }
        }
        if(!email.qnxEmail){
            throw new Error('User must have QNX Email');
        }
        if(email.qnxEmail){
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!regex.test(email.qnxEmail)){
                throw new Error('QNX Email is invalid');
            }
        }
        if(!address){
            throw new Error('User must have address');
        }
        if(!dateOfBirth){
            throw new Error('User must have Date of Birth');
        }
        if(!contract.startDate){
            throw new Error('User must have Contract Start Date');
        }
        if(!contract.contractExpirationDate){
            throw new Error('User must have Contract Expiration Date');
        }
        if(!geolocation.pin){
            throw new Error('User must have pinned location');
        }
        if(!geolocation.gmapAddressLink){
            throw new Error('User must have google map address');
        }
        if(!jobRole){
            throw new Error('User must have job description');
        }
        if(!contact.mobile){
            throw new Error('User must have mobile number');
        }
        if(!contact.emergencyContactPerson){
            throw new Error('User must have emergency contact person');
        }
        if(!contact.emergencyContactNumber){
            throw new Error('User must have emergency contact number');
        }
        return Object.freeze({
            getFirstname: () => firstname,
            getLastname: () => lastname,
            getMiddlename: () => middlename,
            getRole: () => role,
            getUsername: () => username,
            getPassword: () => password,
            getEmail: () => email,
            getqnxEmail: () => qnxEmail,
            getDateOfBirth: () => dateOfBirth,
            getAddress: () => address,
            getStartDate: () => startDate,
            getContractExpirationDate: () => contractExpirationDate,
            getMobile: () => mobile,
            getGeolocation: () => geolocation,
            getJobRole: () => jobRole,

        })

    }
};

module.exports = makeUserEntity;