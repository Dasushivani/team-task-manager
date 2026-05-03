import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import taskService from "../services/taskService";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getTasks();

      setTasks(
        Array.isArray(data) ? data : data.tasks || []
      );
    } catch (error) {
      console.error(
        "Failed to fetch tasks:",
        error.response?.data || error.message
      );

      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = async () => {
    await fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/");
  };

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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user?.name}
          </h1>

          <p className="text-gray-700">
            Role: {user?.role}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-200 p-4 rounded shadow">
          <h2 className="font-bold">Total Tasks</h2>
          <p className="text-2xl">{totalTasks}</p>
        </div>

        <div className="bg-yellow-200 p-4 rounded shadow">
          <h2 className="font-bold">Pending</h2>
          <p className="text-2xl">{pendingTasks}</p>
        </div>

        <div className="bg-purple-200 p-4 rounded shadow">
          <h2 className="font-bold">In Progress</h2>
          <p className="text-2xl">{inProgressTasks}</p>
        </div>

        <div className="bg-green-200 p-4 rounded shadow">
          <h2 className="font-bold">Completed</h2>
          <p className="text-2xl">{completedTasks}</p>
        </div>
      </div>

      <TaskForm onTaskCreated={handleTaskCreated} />

      <TaskList
        tasks={tasks}
        refreshTasks={fetchTasks}
      />
    </div>
  );
};

export default Dashboard;