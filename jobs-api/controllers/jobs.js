const { StatusCodes } = require("http-status-codes");
const Job = require("../models/user");

const createJob = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ msg: "jobs" });
};

const getJobs = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const getJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "jobs" });
};

const updateJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "jobs" });
};

const deleteJob = async (req, res) => {
  res.status(StatusCodes.NO_CONTENT).json({ msg: "jobs" });
};

module.exports = { createJob, getJobs, getJob, updateJob, deleteJob };
