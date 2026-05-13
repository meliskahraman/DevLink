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
        <div className="brand-area">
          <div className="logo-mark">D</div>
          <div>
            <h2>DevLink</h2>
            <p>Architecture-first developer portfolios</p>
          </div>
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

      <main className="hero product-hero">
        <section className="hero-left">
          <span className="badge">Portfolio-Driven Job Board for Developers</span>

          <h1>The architecture-first portfolio platform for developers.</h1>

          <p>
            DevLink turns GitHub repositories into verified technical portfolios.
            Sync your projects, explain architectural decisions, and show
            recruiters how you think as an engineer.
          </p>

          <div className="hero-actions">
            <button onClick={() => setMode("register")}>Start Building</button>
            <button className="secondary" onClick={() => setMode("login")}>
              I already have an account
            </button>
          </div>

          <div className="feature-grid">
            <div>
              <strong>GitHub Sync</strong>
              <span>Import public repositories automatically.</span>
            </div>

            <div>
              <strong>Architecture Notes</strong>
              <span>Document patterns, trade-offs, and decisions.</span>
            </div>

            <div>
              <strong>Verified Portfolio</strong>
              <span>Show technical depth beyond project names.</span>
            </div>

            <div>
              <strong>Recruiter Ready</strong>
              <span>Present your engineering thinking clearly.</span>
            </div>
          </div>
        </section>

        <section className="right-column">
          <div className="product-preview">
            <div className="preview-header">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="preview-content">
              <h3>Portfolio Preview</h3>

              <div className="preview-card">
                <p className="preview-title">devlink-api</p>
                <p>Node.js · Express · PostgreSQL</p>
                <small>Architecture note documented</small>
              </div>

              <div className="preview-card">
                <p className="preview-title">frontend-dashboard</p>
                <p>React · Axios · JWT Auth</p>
                <small>GitHub repository synced</small>
              </div>

              <div className="preview-progress">
                <div>
                  <span>Portfolio Completion</span>
                  <strong>82%</strong>
                </div>
                <div className="mini-progress">
                  <div></div>
                </div>
              </div>
            </div>
          </div>

          <section className="auth-panel">
            {mode === "login" ? (
              <LoginForm onLogin={() => setIsLoggedIn(true)} />
            ) : (
              <RegisterForm />
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;