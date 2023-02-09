const { CustomApiError } = require("../errors/custom-error");

const errorHandlerMiddleWare = (err, req, res, next) => {
    console.log(err)
    return res.status(500).json({ msg: `Something went wrong, please try again.` });
}

module.exports = errorHandlerMiddleWare