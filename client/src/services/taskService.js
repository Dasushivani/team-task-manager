import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

// get dashboard stats
const getTaskStats = async () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/stats`,
    config
  );

  return response.data;
};

// create new task
const createTask = async (taskData) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL,
    taskData,
    config
  );

  return response.data;
};

const taskService = {
  getTaskStats,
  createTask,
};

export default taskService;