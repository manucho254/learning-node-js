const { StatusCodes } = require("http-status-codes");
const Job = require("../models/jobs");
const { NotFoundError, BadRequestError } = require("../errors");

const createJob = async (req, res) => {
  // const { userId, name, email } = req.user;

  // const data = {
  //   ...req.body,
  //   createdBy: { _id: userId, name: name, email: email },
  // };

  req.body.createdBy = req.user.userId;
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ job });
};

const getJobs = async (req, res) => {
  const { userId } = req.user;

  const jobs = await Job.find({ createdBy: userId }).sort("createdAt");

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  // const { user: {userId}, params: { id: jobId }} = req
  const { userId } = req.user;
  const { id: jobId } = req.params;

  // finding the job using the user id sending the request and the id of the job
  const job = await Job.findOne({ createdBy: userId, _id: jobId });

  if (!job) {
    throw new NotFoundError("Job not found");
  }
  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
  // const { user: {userId}, params: { id: jobId }} = req
  const { userId } = req.user;
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (company === "" || position === "") {
    throw new BadRequestError("Invalid data provided");
  }

  // finding the job using the user id sending the request and the id of the job

  // const job = await Job.findOneAndUpdate(
  //   { createdBy: userId, _id: jobId },
  //   req.body,
  //   {
  //     new: true,
  //     runValidators: true,
  //   }
  // );

  const job = await Job.findByIdAndUpdate(
    { createdBy: userId, _id: jobId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!job) {
    throw new NotFoundError("Job not found");
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const { userId } = req.user;
  const { id: jobId } = req.params;

  const job = await Job.findByIdAndDelete({ createdBy: userId, _id: jobId });

  if (!job) {
    throw new NotFoundError("Job not found");
  }

  res
    .status(StatusCodes.NO_CONTENT)
    .json({ message: "Job deleted successfully" });
};

module.exports = { createJob, getJobs, getJob, updateJob, deleteJob };
