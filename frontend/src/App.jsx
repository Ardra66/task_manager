import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function ProtectedRoute({ children, role }) {
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "null");

if (!token || !user) {
return <Navigate to="/login" />;
}

if (role && user.role !== role) {
return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} />;
}

return children;
}

function App() {
return ( <BrowserRouter> <Routes>
<Route path="/" element={<Navigate to="/login" />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />


    <Route
      path="/dashboard"
      element={
        <ProtectedRoute role="user">
          <UserDashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin"
      element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
  </Routes>
</BrowserRouter>


);
}

export default App;
