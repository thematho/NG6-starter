module.exports = function errorHandler(error, req, res, next) {
  let logMsg = error.caller ? `Error on request from: ${error.caller}` : '' ;
  logMsg +=error.method ? ` during function: ${method}`: '';
  logMsg += `\n ${error}`;
  console.log(logMsg);
  response.status(error.status || 500)
    .json({ message: error.message || error });
  next();
};
