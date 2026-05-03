import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const createTask = async (taskData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(API_URL, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getTasks = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateTaskStatus = async (taskId, status) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${taskId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export default {
  createTask,
  getTasks,
  updateTaskStatus,
};