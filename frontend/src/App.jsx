import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");
  console.log(isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
