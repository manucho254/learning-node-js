const User = require("../models/user");
const { UnAuthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("No token provided !");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name, email } = decode

    // another way of attaching the user
    // const user = User.findById(userId).select("-password")
    // req.user = user

    req.user = { userId: userId , name: name, email: email };

    next();
  } catch (error) {
    throw new UnAuthenticatedError("Invalid token.");
  }
};

module.exports = isAuthenticated;
