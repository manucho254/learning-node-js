require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../errors");

const authenticationMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("No token provided.");
  }

  const token = authHeader.split(" ")[1];
 
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decode
    req.user = {id, username}
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Invalid token.");
  }
};

module.exports = authenticationMiddleWare;
