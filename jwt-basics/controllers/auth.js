// check username, password in post(login) request
// if exist create new JWT
// send back to front-end

require("dotenv").config();
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  console.log(token);
  console.log(jwt.decode(token));
  console.log(username, password);
  res.status(200).json({ msg: "user created", token: token });
};

// packages for validating if the data provided is correct
// mongoose validation
// Joi - package
// checking in the controller

const dashboard = async (req, res) => {
  console.log(req.user)
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
