const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async-wrapper");
const { createCustomError } = require("../errors/custom-error");

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  return res.status(201).json({ task: task });
});

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  // res.status(200).json({ tasks })
  // res.status(200).json({ tasks, amount: tasks.length })
  // res.status({status: "success", data: { tasks, nbHits: tasks.length }})
  return res.status(200).json({ tasks: tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  // const task = await Task.findById(taskId);

  if (!task) {
    return next(createCustomError(`Task not found ${taskId}`, 404));
  }
  return res.status(200).json({ data: task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`Task not found ${taskId}`, 404));
  }

  return res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });

  if (!task) {
    return next(createCustomError(`Task not found ${taskId}`, 404));
  }

  // const taskDelete = await Task.deleteOne({ _id: taskId });

  return res.status(204).json({ message: "Task deleted successfully" });
});

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
