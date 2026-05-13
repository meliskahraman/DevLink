import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [mode, setMode] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div>
          <h2>DevLink</h2>
          <p>Architecture-focused portfolio platform</p>
        </div>

        <div className="nav-actions">
          <button onClick={() => setMode("login")}>Login</button>
          <button onClick={() => setMode("register")}>Register</button>
        </div>
      </nav>

      <main className="hero">
        <section className="hero-left">
          <span className="badge">Verified Technical Portfolios</span>

          <h1>Show the architecture behind your code.</h1>

          <p>
            DevLink helps indie developers and students build a verified
            portfolio by syncing GitHub repositories and attaching Architecture
            Notes that explain design patterns, technical decisions, and system
            structure.
          </p>

          <div className="feature-grid">
            <div>GitHub Sync</div>
            <div>JWT Authentication</div>
            <div>PostgreSQL Persistence</div>
            <div>Architecture Notes</div>
          </div>
        </section>

        <section className="auth-panel">
          {mode === "login" ? (
            <LoginForm onLogin={() => setIsLoggedIn(true)} />
          ) : (
            <RegisterForm />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;