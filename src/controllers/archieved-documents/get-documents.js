const getDocumentsController = ({ getDocumentsUseCase }) => {
  return async function get(httpRequest){
      try{
        console.log("CONTROLLER")
          const {source = {}, ...info} = httpRequest.body;
          source.ip = httpRequest.ip;
          source.browser = httpRequest.headers["User-Agent"];

          if(httpRequest.headers["Referrer"]){
              source.referrer = httpRequest.headers["Referrer"];
          };
          const fetched = await getDocumentsUseCase();

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

module.exports = getDocumentsController;