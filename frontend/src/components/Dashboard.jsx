import React, { useMemo, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [githubUsername, setGithubUsername] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const languages = [
      ...new Set(projects.map((p) => p.tech_stack).filter(Boolean)),
    ];

    const completion =
      totalProjects === 0 ? 0 : noteContent.trim().length > 0 ? 100 : 75;

    return {
      totalProjects,
      totalLanguages: languages.length,
      completion,
    };
  }, [projects, noteContent]);

  const handleSync = async () => {
    try {
      const response = await api.post("/api/projects/sync", {
        githubUsername,
      });

      setProjects(response.data.projects);
      setMessage("GitHub projects synced successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "GitHub sync failed.");
    }
  };

  const handleAddNote = async () => {
    try {
      const response = await api.post("/api/architecture-notes", {
        project_id: selectedProjectId,
        note_content: noteContent,
      });

      setNotes((prevNotes) => [
        ...prevNotes,
        {
          project_id: selectedProjectId,
          note_content: noteContent,
        },
      ]);

      setMessage(response.data.message);
      setNoteContent("");
      setSelectedProjectId("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add note.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-shell">
        <aside className="devlink-sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">D</div>
            <div>
              <h2>DevLink</h2>
              <p>Technical Portfolio</p>
            </div>
          </div>

          <div className="sidebar-profile">
            <div className="profile-avatar">U</div>
            <h3>Developer</h3>
            <p>{stats.totalProjects} repositories synced</p>
          </div>

          <nav className="sidebar-menu">
            <a href="#overview">Overview</a>
            <a href="#sync">GitHub Sync</a>
            <a href="#projects">Repositories</a>
            <a href="#notes">Architecture Notes</a>
            <a href="#insights">Insights</a>
          </nav>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <main className="dashboard-main">
          <section id="overview" className="dashboard-hero">
            <div>
              <span className="badge">Architecture-Focused Portfolio</span>
              <h1>Build a verified technical profile from your GitHub work.</h1>
              <p>
                Sync repositories, organize projects, and document the
                architectural decisions behind your code.
              </p>
            </div>
          </section>

          <section className="stats-grid">
            <div className="stat-card">
              <span>Total Projects</span>
              <h3>{stats.totalProjects}</h3>
            </div>

            <div className="stat-card">
              <span>Languages Used</span>
              <h3>{stats.totalLanguages}</h3>
            </div>

            <div className="stat-card">
              <span>Portfolio Completion</span>
              <h3>{stats.completion}%</h3>
            </div>
          </section>

          <section className="dashboard-card">
            <h3>Portfolio Completion</h3>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${stats.completion}%` }}
              />
            </div>

            <p>
              Sync your repositories and add architecture notes to complete your
              technical portfolio.
            </p>
          </section>

          <section id="sync" className="dashboard-card">
            <h3>GitHub Project Sync</h3>
            <p>Import your public repositories from GitHub.</p>

            <input
              type="text"
              placeholder="GitHub username"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
            />

            <button onClick={handleSync}>Sync GitHub Projects</button>
          </section>

          <section id="projects" className="dashboard-card">
            <h3>Repositories</h3>

            {projects.length === 0 ? (
              <div className="empty-state">
                <h4>No repositories synced yet</h4>
                <p>
                  Enter your GitHub username above to import your public
                  repositories.
                </p>
              </div>
            ) : (
              <div className="repo-list">
                {projects.map((project) => (
                  <div className="repo-row" key={project.id}>
                    <div>
                      <h4>{project.project_name}</h4>
                      <p>
                        This repository is ready for architecture documentation.
                      </p>
                    </div>

                    <div className="repo-meta">
                      <span className="language-pill">
                        {project.tech_stack || "Unknown"}
                      </span>

                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Repository
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section id="notes" className="dashboard-card">
            <h3>Add Architecture Note</h3>
            <p>
              Select a repository and explain design patterns, architectural
              decisions, or technical trade-offs.
            </p>

            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
            >
              <option value="">Select project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.project_name}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Example: Used MVC architecture, JWT authentication, and PostgreSQL to separate concerns and improve maintainability."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />

            <button onClick={handleAddNote}>Save Architecture Note</button>

            <div className="notes-list">
              <h4>Saved Notes</h4>

              {notes.length === 0 ? (
                <p>No architecture notes added yet.</p>
              ) : (
                notes.map((note, index) => {
                  const project = projects.find(
                    (p) => String(p.id) === String(note.project_id)
                  );

                  return (
                    <div className="note-item" key={index}>
                      <strong>
                        {project?.project_name || "Unknown Project"}
                      </strong>
                      <p>{note.note_content}</p>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <section id="insights" className="dashboard-card">
            <h3>Portfolio Insights</h3>
            <p>
              {stats.totalProjects === 0
                ? "Sync repositories to generate portfolio insights."
                : `Your portfolio contains ${stats.totalProjects} repositories using ${stats.totalLanguages} different technologies.`}
            </p>
          </section>

          {message && <p className="status-message">{message}</p>}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;