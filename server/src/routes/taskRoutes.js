const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getAssignedTasks,
  getTaskStats,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

// dashboard stats
router.get("/stats", protect, getTaskStats);

// get all created tasks + create task
router.route("/").get(protect, getTasks).post(protect, createTask);

// get assigned tasks
router.get("/assigned", protect, getAssignedTasks);

// update task + delete task
router
  .route("/:id")
  .put(protect, updateTaskStatus)
  .delete(protect, deleteTask);

module.exports = router;