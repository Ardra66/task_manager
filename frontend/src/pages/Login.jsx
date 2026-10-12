import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
const [form, setForm] = useState({
email: "",
password: "",
});

const [message, setMessage] = useState("");
const navigate = useNavigate();

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    form
  );

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));

  if (response.data.user.role === "admin") {
    navigate("/admin");
  } else {
    navigate("/dashboard");
  }
} catch (error) {
  setMessage(error.response?.data?.message || "Login failed");
}


};

return ( <div style={styles.container}> <h2>Login</h2>


  <form onSubmit={handleSubmit} style={styles.form}>
    <input
      name="email"
      type="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      required
    />

    <input
      name="password"
      type="password"
      placeholder="Password"
      value={form.password}
      onChange={handleChange}
      required
    />

    <button type="submit">Login</button>
  </form>

  {message && <p>{message}</p>}

  <p>
    New user? <Link to="/register">Register</Link>
  </p>
</div>

);
}

const styles = {
container: {
maxWidth: "350px",
margin: "80px auto",
padding: "25px",
border: "1px solid #ddd",
borderRadius: "8px",
fontFamily: "Arial",
},
form: {
display: "flex",
flexDirection: "column",
gap: "12px",
},
};

export default Login;
