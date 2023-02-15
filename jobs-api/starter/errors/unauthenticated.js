const CustomApiError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class UnAuthenticatedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = UnAuthenticatedError
