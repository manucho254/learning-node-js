const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


let email_regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name!"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "please provide an email!"],
    match: [email_regex, "Please provide a valid email!"],
    unique: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: [true, "please provide a password!"],
    minlength: 8,
  },
});

// using older mongoose to hash passwords before saving

// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// using mongoose 5 to hash passwords before saving

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// mongoose methods
// this methods generates a new jwt token for us

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

// compare the passwords 
userSchema.methods.comparePassword = async function (user_password) {
  const hasMatched = await bcrypt.compare(user_password, this.password);
  // this function returns a promise
  return hasMatched
};

const User = mongoose.model("User", userSchema);

module.exports = User;
