const mongoose = require("mongoose");

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
  password:  {
    type: String,
    required: [true, "please provide a password!"],
    minlength: 8,
    maxlength: 20,
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
