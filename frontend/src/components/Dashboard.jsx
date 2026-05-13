import React, { useMemo, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [githubUsername, setGithubUsername] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const languages = [
      ...new Set(projects.map((p) => p.tech_stack).filter(Boolean)),
    ];

    const completion =
      totalProjects === 0
        ? 0
        : noteContent.trim().length > 0
        ? 100
        : 70;

    return {
      totalProjects,
      totalLanguages: languages.length,
      completion,
    };
  }, [projects, noteContent]);

  const handleSync = async () => {
    try {
      const response = await axios.post(
        "https://devlink-api-3y46.onrender.com/api/projects/sync",
        { githubUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(response.data.projects);
      setMessage("GitHub projects synced successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "GitHub sync failed.");
    }
  };

  const handleAddNote = async () => {
    try {
      const response = await axios.post(
        "https://devlink-api-3y46.onrender.com/api/architecture-notes",
        {
          project_id: selectedProjectId,
          note_content: noteContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setNoteContent("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to add architecture note."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Developer Dashboard</h2>
          <p>
            Build a verified technical portfolio by documenting the architecture
            behind your projects.
          </p>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="stats-grid">
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
      </div>

      <div className="dashboard-card">
        <h3>Portfolio Completion</h3>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${stats.completion}%` }}
          />
        </div>

        <p>
          Sync your repositories and add architecture notes to complete your
          portfolio.
        </p>
      </div>

      <div className="dashboard-card">
        <h3>GitHub Project Sync</h3>
        <p>Import your public repositories from GitHub.</p>

        <input
          type="text"
          placeholder="GitHub username"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
        />

        <button onClick={handleSync}>Sync GitHub Projects</button>
      </div>

      <div className="dashboard-card">
        <h3>Synced Projects</h3>

        {projects.length === 0 ? (
          <p>No projects synced yet.</p>
        ) : (
          <div className="project-list">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>
                <div className="project-badge">
                  {project.tech_stack || "Unknown"}
                </div>

                <h4>{project.project_name}</h4>

                <p>
                  This repository has been imported and is ready for architecture
                  documentation.
                </p>

                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Repository →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-card">
        <h3>Add Architecture Note</h3>
        <p>
          Document the design decisions, patterns, and technical structure of
          your project.
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
      </div>

      <div className="dashboard-card">
        <h3>Portfolio Insights</h3>
        <p>
          {stats.totalProjects === 0
            ? "Sync your repositories to generate portfolio insights."
            : `You have documented ${stats.totalProjects} repositories across ${stats.totalLanguages} different technologies.`}
        </p>
      </div>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default Dashboard;