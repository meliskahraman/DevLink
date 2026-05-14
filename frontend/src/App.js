import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import useAuth from "./hooks/useAuth";
import "./App.css";

function App() {
  const [mode, setMode] = useState("login");
  const { isLoggedIn, login } = useAuth();

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="app">
      <nav className="navbar premium-nav">
        <div className="brand-area">
          <div className="logo-mark">D</div>
          <div>
            <h2>DevLink</h2>
            <p>Architecture-first portfolios</p>
          </div>
        </div>

        <div className="nav-links">
          <a href="#how">How it Works</a>
          <a href="#features">Features</a>
          <a href="#recruiters">Recruiters</a>
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

      <main className="premium-hero">
        <section className="hero-copy">
          <span className="badge">
            The GitHub for Architecture-Driven Portfolios
          </span>

          <h1>
            Show recruiters
            <br />
            how you think,
            <br />
            not just what you built.
          </h1>

          <p>
            DevLink transforms GitHub repositories into verified technical
            portfolios. Sync projects, document architectural decisions, and
            present your engineering reasoning with clarity and credibility.
          </p>

          <div className="hero-actions">
            <button onClick={() => setMode("register")}>
              Build Your Portfolio
            </button>

            <button
              className="secondary"
              onClick={() => setMode("login")}
            >
              Open Dashboard
            </button>
          </div>

          <div className="hero-metrics">
            <div>
              <strong>GitHub</strong>
              <span>Live Repository Sync</span>
            </div>
            <div>
              <strong>Architecture</strong>
              <span>Decision Documentation</span>
            </div>
            <div>
              <strong>Recruiters</strong>
              <span>Technical Candidate Discovery</span>
            </div>
          </div>

          <div className="trust-strip">
            <span>JWT Authentication</span>
            <span>PostgreSQL</span>
            <span>React</span>
            <span>Express API</span>
          </div>
        </section>

        <section className="hero-showcase">
          <div className="orb orb-one"></div>
          <div className="orb orb-two"></div>

          <div className="mock-browser floating-card">
            <div className="mock-top">
              <span></span>
              <span></span>
              <span></span>
              <p>devlink.app/portfolio/melis</p>
            </div>

            <div className="mock-content">
              <div className="mock-sidebar">
                <div className="mock-avatar">M</div>
                <h4>Melis Kahraman</h4>
                <p>Frontend Developer & Software Architect</p>
                <button>Public Portfolio</button>
              </div>

              <div className="mock-main">
                <div className="mock-stats">
                  <div>
                    <b>12</b>
                    <span>Projects</span>
                  </div>
                  <div>
                    <b>8</b>
                    <span>Architecture Notes</span>
                  </div>
                  <div>
                    <b>86%</b>
                    <span>Portfolio Completion</span>
                  </div>
                </div>

                <div className="mock-repo">
                  <div>
                    <h4>DevLink API</h4>
                    <p>
                      Express REST API with JWT authentication and PostgreSQL.
                    </p>
                  </div>
                  <span>Verified</span>
                </div>

                <div className="mock-repo">
                  <div>
                    <h4>Portfolio Dashboard</h4>
                    <p>
                      React SPA for syncing repositories and writing
                      architecture notes.
                    </p>
                  </div>
                  <span>Synced</span>
                </div>

                <div className="mock-note">
                  <h4>Engineering Decision</h4>
                  <p>
                    Applied layered architecture to separate presentation,
                    services, APIs, and persistence for maintainability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-floating-card">
            {mode === "login" ? (
              <LoginForm onLogin={login} />
            ) : (
              <RegisterForm />
            )}
          </div>
        </section>
      </main>

      <section id="how" className="section-block">
        <div className="section-heading">
          <span className="badge">How It Works</span>
          <h2>From repository to recruiter-ready technical portfolio.</h2>
        </div>

        <div className="steps-grid">
          <div>
            <span>01</span>
            <h3>Create Account</h3>
            <p>Register securely and access your technical portfolio hub.</p>
          </div>

          <div>
            <span>02</span>
            <h3>Sync GitHub</h3>
            <p>Import your public repositories automatically.</p>
          </div>

          <div>
            <span>03</span>
            <h3>Add Architecture Notes</h3>
            <p>Explain technical decisions, trade-offs, and patterns.</p>
          </div>

          <div>
            <span>04</span>
            <h3>Get Discovered</h3>
            <p>Recruiters search by technology and architectural thinking.</p>
          </div>
        </div>
      </section>

      <section id="features" className="section-block">
        <div className="section-heading">
          <span className="badge">Platform Capabilities</span>
          <h2>A premium portfolio system for serious developers.</h2>
        </div>

        <div className="premium-feature-grid">
          <div>
            <h3>Verified Repository Data</h3>
            <p>
              Connect directly to GitHub and showcase authentic project
              metadata.
            </p>
          </div>

          <div>
            <h3>Architecture Intelligence</h3>
            <p>
              Highlight design patterns, system structure, and technical
              decisions.
            </p>
          </div>

          <div>
            <h3>Recruiter Discovery</h3>
            <p>
              Filter candidates by technology stack and engineering depth.
            </p>
          </div>

          <div>
            <h3>Secure Infrastructure</h3>
            <p>
              Built with React, Express, JWT authentication, and PostgreSQL.
            </p>
          </div>
        </div>
      </section>

      <section id="recruiters" className="recruiter-section">
        <div>
          <span className="badge">For Recruiters</span>
          <h2>Evaluate engineering thinking before the interview.</h2>
          <p>
            DevLink reveals architecture decisions, technical trade-offs, and
            implementation reasoning—providing a deeper signal than a standard
            résumé or repository list.
          </p>
        </div>

        <div className="recruiter-card">
          <h3>Candidate Signal</h3>
          <ul>
            <li>Repository Ownership</li>
            <li>Architecture Awareness</li>
            <li>Technology Experience</li>
            <li>Decision-Making Clarity</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;