const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = { name, email, password: hashedPassword};

  const user = await User.create({ ...tempUser });

  res.status(StatusCodes.CREATED).json({ msg: "User created", user });
};

const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "logged in successfully" });
};

module.exports = { login, register };
