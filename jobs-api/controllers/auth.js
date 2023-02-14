const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, token: token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide an email and password !");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("Does not exist");
  }

  const isPasswordCorrect = await user.comparePassword(password)
  console.log(isPasswordCorrect)

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid credentials!");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token: token });
};

module.exports = { login, register };
