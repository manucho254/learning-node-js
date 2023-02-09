const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async-wrapper");

const createTask = asyncWrapper(async (req, res) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json({ success: true, task: task });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Error creating task, please try again.",
    });
  }
});

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    // res.status(200).json({ tasks })
    // res.status(200).json({ tasks, amount: tasks.length })
    // res.status({status: "success", data: { tasks, nbHits: tasks.length }})
    return res.status(200).json({ success: true, tasks: tasks });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Error getting tasks, please try again.",
    });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;

    const task = await Task.findOne({ _id: taskId });
    // const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task with id ${taskId} not found, please try again.`,
      });
    }

    return res.status(200).json({ success: true, data: task });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Error getting tasks, please try again.",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found, please try again." });
    }

    return res.status(200).json({ success: true, task });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Error getting tasks, please try again.",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;

    const task = await Task.findOneAndDelete({ _id: taskId });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found, please try again." });
    }

    // const taskDelete = await Task.deleteOne({ _id: taskId });

    return res
      .status(204)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Error getting tasks, please try again.",
    });
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
