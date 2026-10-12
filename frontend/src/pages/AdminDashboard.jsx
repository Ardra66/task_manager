import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
const [tasks, setTasks] = useState([]);
const [message, setMessage] = useState("");

const token = localStorage.getItem("token");

const api = axios.create({
headers: { Authorization: `Bearer ${token}` },
});

const loadTasks = async () => {
try {
const response = await api.get("http://localhost:5000/api/tasks");
setTasks(response.data);
} catch (error) {
setMessage(error.response?.data?.message || "Could not load tasks");
}
};

useEffect(() => {
loadTasks();
}, []);

const handleDelete = async (id) => {
try {
await api.delete(`http://localhost:5000/api/tasks/${id}`);
await loadTasks();
} catch (error) {
setMessage(error.response?.data?.message || "Could not delete task");
}
};

const logout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");
window.location.href = "/login";
};

return (
<div style={{ maxWidth: "700px", margin: "40px auto", fontFamily: "Arial" }}> <h2>Admin Dashboard</h2> <button onClick={logout}>Logout</button>

  {message && <p>{message}</p>}

  <h3>All Users' Tasks</h3>

  {tasks.map((task) => (
    <div key={task._id} style={{ border: "1px solid #ddd", padding: "12px", marginTop: "10px" }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>
        Owner:{" "}
        {typeof task.user_id === "object"
          ? task.user_id?.name || "Unknown"
          : "User"}
      </p>
      <button onClick={() => handleDelete(task._id)}>Delete Task</button>
    </div>
  ))}
</div>

);
}

export default AdminDashboard;
