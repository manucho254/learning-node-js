const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("../errors/custom-error");

const errorHandlerMiddleWare = (err, req, res, next) => {
  console.log(err.message)
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: `Something went wrong, please try again.` });
};

module.exports = errorHandlerMiddleWare;
