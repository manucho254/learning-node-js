const { StatusCodes } = require("http-status-codes");

const User = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const { _id, name, email } = user;

  const token = jwt.sign({ userId: _id, name, email }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });

  res.status(StatusCodes.CREATED).json({ user: { name: name }, token });
};

const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "logged in successfully" });
};

module.exports = { login, register };
