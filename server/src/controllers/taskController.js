const Task = require("../models/Task");

// create new task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, assignedTo, dueDate } = req.body;

    // validation
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    // create task
    const task = await Task.create({
      title,
      description,
      priority,
      assignedTo,
      dueDate,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// get all tasks created by logged in user
const getTasks = async (req, res) => {
  try {
    // find tasks created by current user
    const tasks = await Task.find({
      createdBy: req.user.id,
    }).populate("assignedTo", "name email");

    res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// get tasks assigned to logged in user
const getAssignedTasks = async (req, res) => {
  try {
    // find tasks assigned to current user
    const tasks = await Task.find({
      assignedTo: req.user.id,
    }).populate("createdBy", "name email");

    res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// get dashboard task stats
const getTaskStats = async (req, res) => {
  try {
    // get tasks created by current user
    const tasks = await Task.find({
      createdBy: req.user.id,
    });

    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter(
      (task) => task.status === "pending"
    ).length;

    const inProgressTasks = tasks.filter(
      (task) => task.status === "in-progress"
    ).length;

    const completedTasks = tasks.filter(
      (task) => task.status === "completed"
    ).length;

    res.status(200).json({
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// update task status
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // valid status values
    const validStatuses = ["pending", "in-progress", "completed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    // find task by id where user is creator OR assigned member
    const task = await Task.findOne({
      _id: req.params.id,
      $or: [
        { createdBy: req.user.id },
        { assignedTo: req.user.id },
      ],
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // update status
    task.status = status;

    await task.save();

    res.status(200).json({
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// delete task
const deleteTask = async (req, res) => {
  try {
    // only creator can delete task
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // delete task
    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getAssignedTasks,
  getTaskStats,
  updateTaskStatus,
  deleteTask,
};