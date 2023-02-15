const { StatusCodes } = require("http-status-codes");
const { CustomApiError } = require("../errors");

const errorHandlerMiddleWare = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    msg: "Something went wrong, please try again", err
  });
};

module.exports = errorHandlerMiddleWare;
