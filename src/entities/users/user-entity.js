const makeUserEntity = ({}) => {
    return function makeUserAccount({
     firstname, lastname, middlename, role, username, password, email, dateOfBirth
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

        if(!username){
            throw new Error('User must have username');
        }

        if(!password){
            throw new Error('User must have password');
        }

        if(!email){
            throw new Error('User must have email');
        }

        if(!dateOfBirth){
            throw new Error('User must have Date of Birth');
        }
        return Object.freeze({
            getFirstname: () => firstname,
            getLastname: () => lastname,
            getMiddlename: () => middlename,
            getRole: () => role,
            getUsername: () => username,
            getPassword: () => password,
            getEmail: () => email,
            getDateOfBirth: () => dateOfBirth

        })

    }
};

module.exports = makeUserEntity;