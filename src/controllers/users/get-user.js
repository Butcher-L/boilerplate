const getUserController = ({ getUserUseCase }) => {
  return async function get(httpRequest){
      try{
          const {source = {}} = httpRequest.body;
          source.ip = httpRequest.ip;
          source.browser = httpRequest.headers["User-Agent"];

          if(httpRequest.headers["Referrer"]){
              source.referrer = httpRequest.headers["Referrer"];
          };          

          const id = httpRequest.params.id
          const fetched = await getUserUseCase(id);

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
          statusCode: 400,
          body: {
              error: err.message
          }
          };
      };
  }; 
}

module.exports = getUserController;