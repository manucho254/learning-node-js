const CustomApiError = require("./custom-error");
const BadRequestError = require("./bad-request");
const NotFoundError = require("./not-found");
const UnAuthenticatedError = require("./unauthenticated");

module.exports = {
  CustomApiError,
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
};
