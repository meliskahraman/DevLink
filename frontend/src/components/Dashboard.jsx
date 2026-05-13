import React, { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [githubUsername, setGithubUsername] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

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
      setMessage("GitHub projects synced successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "GitHub sync failed");
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
      setMessage(error.response?.data?.message || "Failed to add note");
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
            Sync your GitHub projects and document your architectural decisions.
          </p>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-card">
        <h3>GitHub Project Sync</h3>
        <p>Enter your GitHub username to import your public repositories.</p>

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
                <h4>{project.project_name}</h4>
                <p>Tech Stack: {project.tech_stack}</p>
                <a href={project.github_url} target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-card">
        <h3>Add Architecture Note</h3>
        <p>
          Select a synced project and explain the architectural decisions behind
          it.
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
          placeholder="Example: Used MVC architecture to separate UI, business logic, and data access layers."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />

        <button onClick={handleAddNote}>Save Architecture Note</button>
      </div>

      <p className="status-message">{message}</p>
    </div>
  );
}

export default Dashboard;