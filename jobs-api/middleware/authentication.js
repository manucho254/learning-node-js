const User = require("../models/user");
const { UnAuthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (err, req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("No token provided !");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decode._id, name: decode.name, email: decode.email };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Invalid token.");
  }
};

module.exports = isAuthenticated;
