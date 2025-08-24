// src/components/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hard-coded admin credentials
  const adminUser = {
    username: "nitin@5319",
    password: "nitin@5319",
    image: "/images/admin.jpeg", // public folder
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === adminUser.username && password === adminUser.password) {
      setError("");
      // Optional: session save
      localStorage.setItem("adminUser", JSON.stringify(adminUser));
      // Redirect to admin home page
      navigate("/cbaddda");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="admin-login-container">
      {/* ✅ Back to Home Button */}

      <div className="login-form">
        <button
          type="button"
          className="login-to-back-home"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
        
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {error && <p className="error-msg">{error}</p>}
        </form>
        <br />
      </div>
    </div>
  );
};
