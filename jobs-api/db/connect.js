require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const connectDb = () => {
  return mongoose.set({ strictQuery: false }).connect(MONGO_URI)
};

module.exports = connectDb;
