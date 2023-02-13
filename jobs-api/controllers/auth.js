const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

const register = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ mg: "User created" });
};

const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ mg: "logged in successfully" });
};

module.exports = { login, register };
