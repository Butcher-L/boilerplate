const R = require('ramda')

const getSelfServicesController = ({ getSelfServicesUseCase }) => {
  return async function get(httpRequest){
      try{
          const {source = {}, ...info} = httpRequest.body;
          source.ip = httpRequest.ip;
          source.browser = httpRequest.headers["User-Agent"];

          if(httpRequest.headers["Referrer"]){
              source.referrer = httpRequest.headers["Referrer"];
          };

          const { userPolicy } = httpRequest.user

          if(!R.includes('employee-self-service', userPolicy.module)){
            throw new Error('Not authorize to access this module')
          }

          const fetched = await getSelfServicesUseCase();

          return {
              headers: {
                "Content-Type": "application/json",
                "Last-Modified": new Date(fetched.modifiedOn).toUTCString()
              },
              statusCode: 200,
              body: fetched 
            };

      } catch(err){
          console.log(err);

          return {
          headers: {
              "Content-Type": "application/json"
          },
          statusCode: 403,
          body: {
              error: err.message
          }
          };
      };
  };
}

module.exports = getSelfServicesController;