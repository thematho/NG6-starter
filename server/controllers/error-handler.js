module.exports = function errorHandlerFactory(caller) {
  const errorHandler = {
    getHandler: function (method, defaultError) {
      return (response, error) => {
        console.log(`Error on request from: ${caller || 'no-controller'} during function: ${method}`);
        response
          .status(defaultError.status || error.status || 500)
          .json({ message: defaultError.message || error.message || error });
      };
    }
  };
  return errorHandler;
};
