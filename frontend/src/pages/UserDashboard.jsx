import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/tasks";

function UserDashboard() {
const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [editId, setEditId] = useState(null);
const [message, setMessage] = useState("");

const token = localStorage.getItem("token");

const api = axios.create({
headers: { Authorization: `Bearer ${token}` },
});

const loadTasks = async () => {
try {
const response = await api.get(API);
setTasks(response.data);
} catch (error) {
setMessage(error.response?.data?.message || "Could not load tasks");
}
};

useEffect(() => {
loadTasks();
}, []);

const handleSubmit = async (e) => {
e.preventDefault();

try {
  const data = { title, description };

  if (editId) {
    await api.put(`${API}/${editId}`, data);
  } else {
    await api.post(API, data);
  }

  setTitle("");
  setDescription("");
  setEditId(null);
  setMessage("");
  await loadTasks();
} catch (error) {
  setMessage(error.response?.data?.message || "Could not save task");
}


};

const handleEdit = (task) => {
setTitle(task.title);
setDescription(task.description || "");
setEditId(task._id);
};

const handleDelete = async (id) => {
try {
await api.delete(`${API}/${id}`);
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
<div style={{ maxWidth: "650px", margin: "40px auto", fontFamily: "Arial" }}> <h2>User Dashboard</h2> <button onClick={logout}>Logout</button>```
  <h3>{editId ? "Edit Task" : "Add Task"}</h3>

  <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
    <input
      placeholder="Task title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />

    <input
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <button type="submit">{editId ? "Update Task" : "Add Task"}</button>

    {editId && (
      <button
        type="button"
        onClick={() => {
          setEditId(null);
          setTitle("");
          setDescription("");
        }}
      >
        Cancel Edit
      </button>
    )}
  </form>

  {message && <p>{message}</p>}

  <h3>My Tasks</h3>

  {tasks.map((task) => (
    <div key={task._id} style={{ border: "1px solid #ddd", padding: "12px", marginTop: "10px" }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <button onClick={() => handleEdit(task)}>Edit</button>{" "}
      <button onClick={() => handleDelete(task._id)}>Delete</button>
    </div>
  ))}
</div>


);
}

export default UserDashboard;

