const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks-2");

// router.post("/", createTask);
// router.get("/", getTasks);
// router.get("/:id", getTask);
// router.put("/:id", updateTask);
// router.delete("/:id", deleteTask);

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
