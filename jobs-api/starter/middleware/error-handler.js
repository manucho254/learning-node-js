const { StatusCodes } = require("http-status-codes");
const { CustomApiError } = require("../errors");

const errorHandlerMiddleWare = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again",
  };

  // if (err instanceof CustomApiError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please try again`;
    customError.statusCode = 400;
  }

  if (err.name && err.name === "ValidationError") {
    customError.msg = Object.values(err.errors).map((item) => item.message).join(",")
    customError.statusCode = 400;
  }

  if (err.name && err.name === "CastError") {
    customError.msg = `No item found with id ${err.value}, please try again.`
    customError.statusCode = 404;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //   msg: "Something went wrong, please try again", err
  // });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleWare;
