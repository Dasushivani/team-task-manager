import taskService from "../services/taskService";

const TaskList = ({ tasks = [], refreshTasks }) => {
  const handleStatusChange = async (taskId, status) => {
    try {
      await taskService.updateTaskStatus(taskId, status);
      refreshTasks();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (!tasks || tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Due Date</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="p-2 border">{task.title}</td>
              <td className="p-2 border">{task.priority}</td>
              <td className="p-2 border">{task.status}</td>
              <td className="p-2 border">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : ""}
              </td>
              <td className="p-2 border">
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;