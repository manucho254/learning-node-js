class CustomApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (message, status) => {
  return CustomApiError(message, status);
};

module.exports = { CustomApiError, createCustomError };
