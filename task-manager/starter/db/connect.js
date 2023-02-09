const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URI } = process.env;

function connectDb() {
  return mongoose.set({ strictQuery: false }).connect(MONGO_URI);
}

module.exports = connectDb;
