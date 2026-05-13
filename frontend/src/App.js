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
      <nav className="navbar premium-nav">
        <div className="brand-area">
          <div className="logo-mark">D</div>
          <div>
            <h2>DevLink</h2>
            <p>Architecture-first portfolios</p>
          </div>
        </div>

        <div className="nav-links">
          <a href="#how">How it works</a>
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
          <span className="badge">Portfolio-driven job board for indie developers</span>

          <h1>
            Turn your GitHub projects into a verified technical portfolio.
          </h1>

          <p>
            DevLink helps students and indie developers showcase not only what
            they built, but how they designed it. Sync repositories, add
            architecture notes, and present your engineering decisions clearly.
          </p>

          <div className="hero-actions">
            <button onClick={() => setMode("register")}>Start Building</button>
            <button className="secondary" onClick={() => setMode("login")}>
              Login to Dashboard
            </button>
          </div>

          <div className="hero-metrics">
            <div>
              <strong>GitHub</strong>
              <span>Repository Sync</span>
            </div>
            <div>
              <strong>JWT</strong>
              <span>Secure Auth</span>
            </div>
            <div>
              <strong>PostgreSQL</strong>
              <span>Persistent Data</span>
            </div>
          </div>
        </section>

        <section className="hero-showcase">
          <div className="mock-browser">
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
                <p>Frontend & Architecture Portfolio</p>
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
                    <span>Notes</span>
                  </div>
                  <div>
                    <b>86%</b>
                    <span>Complete</span>
                  </div>
                </div>

                <div className="mock-repo">
                  <div>
                    <h4>devlink-api</h4>
                    <p>Express REST API with JWT authentication and PostgreSQL.</p>
                  </div>
                  <span>Architecture documented</span>
                </div>

                <div className="mock-repo">
                  <div>
                    <h4>portfolio-dashboard</h4>
                    <p>React SPA for syncing projects and writing architecture notes.</p>
                  </div>
                  <span>GitHub synced</span>
                </div>

                <div className="mock-note">
                  <h4>Architecture Note</h4>
                  <p>
                    Used layered architecture to separate presentation,
                    service, API, and persistence concerns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-floating-card">
            {mode === "login" ? (
              <LoginForm onLogin={() => setIsLoggedIn(true)} />
            ) : (
              <RegisterForm />
            )}
          </div>
        </section>
      </main>

      <section id="how" className="section-block">
        <div className="section-heading">
          <span className="badge">How it works</span>
          <h2>From repository to recruiter-ready portfolio.</h2>
        </div>

        <div className="steps-grid">
          <div>
            <span>01</span>
            <h3>Create account</h3>
            <p>Register securely and access your developer dashboard.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Sync GitHub</h3>
            <p>Import public repositories into your technical profile.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Add architecture notes</h3>
            <p>Explain design patterns, trade-offs, and system decisions.</p>
          </div>
          <div>
            <span>04</span>
            <h3>Show your portfolio</h3>
            <p>Present engineering thinking, not only project names.</p>
          </div>
        </div>
      </section>

      <section id="features" className="section-block">
        <div className="section-heading">
          <span className="badge">Features</span>
          <h2>Built for architecture-focused technical portfolios.</h2>
        </div>

        <div className="premium-feature-grid">
          <div>
            <h3>Verified project metadata</h3>
            <p>Import real repository data from GitHub and store it persistently.</p>
          </div>
          <div>
            <h3>Architecture documentation</h3>
            <p>Attach technical notes that explain why your system is designed that way.</p>
          </div>
          <div>
            <h3>Secure authentication</h3>
            <p>JWT-based login protects portfolio management features.</p>
          </div>
          <div>
            <h3>Portfolio insights</h3>
            <p>Track project count, technology usage, and portfolio completion.</p>
          </div>
        </div>
      </section>

      <section id="recruiters" className="recruiter-section">
        <div>
          <span className="badge">For recruiters</span>
          <h2>Evaluate how developers think, not only what they built.</h2>
          <p>
            DevLink makes architectural decisions visible. Recruiters can
            understand technology choices, design patterns, and engineering
            reasoning before an interview.
          </p>
        </div>

        <div className="recruiter-card">
          <h3>Candidate Signal</h3>
          <ul>
            <li>Project ownership</li>
            <li>Architecture awareness</li>
            <li>Technology experience</li>
            <li>Decision-making clarity</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;