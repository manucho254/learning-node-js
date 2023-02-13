const { StatusCodes } = require("http-status-codes");
const Job = require("../models/user");

const createJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "jobs" });
};

const getJobs = async (req, res) => {
  const jobs = Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

const getJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "jobs" });
};

const updateJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "jobs" });
};

const deleteJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "jobs" });
};

module.exports = { createJob, getJobs, getJob, updateJob, deleteJob };
