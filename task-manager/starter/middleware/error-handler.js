const { CustomApiError } = require("../errors/custom-error")

const errorHandlerMiddleWare = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        return res.status(res.statusCode).json({msg: err.message})
    }

    // res.status(500).json({ msg: err });
    // res.status(500).json({ msg: `Something went wrong, please try again.` });
    return res.status(500).json({ msg: `Something went wrong, please try again.` });
};


module.exports = errorHandlerMiddleWare