const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
