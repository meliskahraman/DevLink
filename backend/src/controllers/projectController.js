const { Project } = require("../models");
const { syncGithubRepos } = require("../services/ExternalApiService");

const syncProjects = async (req, res) => {
  try {
    console.log("SYNC REQUEST RECEIVED");
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const { githubUsername } = req.body;

    if (!githubUsername) {
      return res.status(400).json({ message: "GitHub username is required" });
    }

    const repos = await syncGithubRepos(githubUsername);
    console.log("Repos fetched:", repos.length);

    const savedProjects = await Promise.all(
      repos.map((repo) =>
        Project.create({
          user_id: req.user.id,
          project_name: repo.project_name,
          tech_stack: repo.tech_stack,
          github_url: repo.github_url,
        })
      )
    );

    res.status(200).json({
      message: "GitHub projects synced successfully",
      count: savedProjects.length,
      projects: savedProjects,
    });
  } catch (error) {
    console.error("GITHUB SYNC ERROR:", error);

    res.status(500).json({
      message: "GitHub sync failed",
      error: error.message,
    });
  }
};

module.exports = {
  syncProjects,
};