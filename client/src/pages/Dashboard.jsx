import { useEffect, useState } from "react";
import taskService from "../services/taskService";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await taskService.getTaskStats();
        setStats(data);
      } catch (error) {
        console.log("Failed to load stats");
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1>Welcome, {user?.name}</h1>
        <h2>Role: {user?.role}</h2>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={cardStyle("#e3f2fd")}>
            <h3>Total Tasks</h3>
            <p style={numberStyle}>{stats.totalTasks}</p>
          </div>

          <div style={cardStyle("#fff3e0")}>
            <h3>Pending</h3>
            <p style={numberStyle}>{stats.pendingTasks}</p>
          </div>

          <div style={cardStyle("#ede7f6")}>
            <h3>In Progress</h3>
            <p style={numberStyle}>{stats.inProgressTasks}</p>
          </div>

          <div style={cardStyle("#e8f5e9")}>
            <h3>Completed</h3>
            <p style={numberStyle}>{stats.completedTasks}</p>
          </div>
        </div>

        {/* Task Form */}
        <TaskForm />

        {/* Task List */}
        <TaskList />

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "40px",
            padding: "12px 30px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

/* Styles */
const cardStyle = (bg) => ({
  flex: "1",
  minWidth: "180px",
  backgroundColor: bg,
  padding: "25px",
  borderRadius: "10px",
});

const numberStyle = {
  fontSize: "24px",
  fontWeight: "bold",
};

export default Dashboard;