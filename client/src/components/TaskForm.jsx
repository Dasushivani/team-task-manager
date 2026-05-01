import { useState } from "react";
import taskService from "../services/taskService";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await taskService.createTask({
        title,
        description,
        priority,
        assignedTo,
        dueDate,
      });

      console.log("Task Created:", response);

      alert("Task created successfully!");

      setTitle("");
      setDescription("");
      setPriority("medium");
      setAssignedTo("");
      setDueDate("");

      window.location.reload();
    } catch (error) {
      console.log(
        error.response?.data?.message ||
          "Task creation failed"
      );
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
        Create New Task
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Title:</label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Description:</label>
          <textarea
            placeholder="Enter task description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Assign To (User ID):</label>
          <input
            type="text"
            placeholder="Enter member user ID"
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(e.target.value)
            }
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;