import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "./App.css";

function App() {
  const [mode, setMode] = useState("login");

  return (
    <div className="app">
      <nav className="navbar">
        <div>
          <h2>DevLink</h2>
          <p>Architecture-focused portfolio platform</p>
        </div>

        <div className="nav-actions">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>

          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>
      </nav>

      <main className="hero">
        <section className="hero-left">
          <span className="badge">Phase 2 Deployment Ready</span>

          <h1>Showcase your code architecture, not just your projects.</h1>

          <p>
            DevLink helps indie developers and students build a verified
            technical portfolio with GitHub synchronization, architecture notes,
            JWT authentication and PostgreSQL persistence.
          </p>

          <div className="feature-grid">
            <div>GitHub Sync</div>
            <div>JWT Auth</div>
            <div>PostgreSQL</div>
            <div>Architecture Notes</div>
          </div>
        </section>

        <section className="auth-panel">
          {mode === "login" ? <LoginForm /> : <RegisterForm />}
        </section>
      </main>
    </div>
  );
}

export default App;