import { useEffect, useState } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://team-task-manager-ye0r.onrender.com",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const taskData = Array.isArray(response.data)
        ? response.data
        : response.data.tasks || [];

      setTasks(taskData);
    } catch (error) {
      console.log("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task updated successfully!");

      fetchTasks();

      window.location.reload();
    } catch (error) {
      console.log("Failed to update task");
    }
  };

  return (
    <div
      style={{
        marginTop: "40px",
        padding: "30px",
        backgroundColor: "#fafafa",
        borderRadius: "10px",
        textAlign: "left",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        Task List
      </h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Priority</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Due Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td style={tdStyle}>
                  {task.title || "No Title"}
                </td>

                <td style={tdStyle}>
                  {task.priority || "N/A"}
                </td>

                <td style={tdStyle}>
                  {task.status || "pending"}
                </td>

                <td style={tdStyle}>
                  {task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "No Date"}
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() =>
                      updateStatus(
                        task._id,
                        "in-progress"
                      )
                    }
                    style={{
                      marginRight: "5px",
                      padding: "5px 10px",
                    }}
                  >
                    In Progress
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        task._id,
                        "completed"
                      )
                    }
                    style={{
                      padding: "5px 10px",
                    }}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  borderBottom: "1px solid #ccc",
  padding: "10px",
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "10px",
};

export default TaskList;
