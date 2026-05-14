import React, { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Önce Vercel environment variable'ı kullan,
    // yoksa sabit URL'ye düş.
    const API_URL =
      process.env.REACT_APP_API_URL ||
      "https://devlink-api-3y46.onrender.com";

    console.log("API URL:", API_URL);

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      // JWT token'ı localStorage'a kaydet
      localStorage.setItem("token", token);

      setMessage("Login successful");

      // Login başarılı olunca Dashboard'u göstermek için sayfayı yenile
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message);

      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default LoginForm;