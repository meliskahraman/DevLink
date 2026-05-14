import React, { useState } from "react";
import api from "../services/api";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/register", {
        email,
        password,
      });

      setMessage("Developer account created successfully.");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed."
      );
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

        <span className="terminal-title">devlink/auth/register</span>
      </div>

      <div className="terminal-body">
        <p className="terminal-line">
          <span>$</span> create developer workspace
        </p>

        <h2>Register</h2>

        <form onSubmit={handleRegister}>
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
            placeholder="Create secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Initialize Account</button>
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

export default RegisterForm;