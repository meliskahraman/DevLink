import React, { useState } from "react";
import api from "../services/api";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      setMessage("Access granted. Loading workspace...");

      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message);

      setMessage(error.response?.data?.message || "Access denied.");
    }
  };

  return (
    <div className="terminal-auth">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>

        <span className="terminal-title">devlink/auth/login</span>
      </div>

      <div className="terminal-body">
        <p className="terminal-line">
          <span>$</span> authenticate developer workspace
        </p>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="user@devlink.app"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Run Login Command</button>
        </form>

        {message && (
          <p className="terminal-message">
            <span>&gt;</span> {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginForm;