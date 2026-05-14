const { Project } = require("../models");
const { syncGithubRepos } = require("../services/ExternalApiService");

const syncProjects = async (req, res) => {
  try {
    const { githubUsername } = req.body;

    if (!githubUsername) {
      return res.status(400).json({
        message: "GitHub username is required",
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const repos = await syncGithubRepos(githubUsername);

    const savedProjects = [];

    for (const repo of repos) {
      const [project] = await Project.findOrCreate({
        where: {
          user_id: req.user.id,
          github_url: repo.github_url,
        },
        defaults: {
          user_id: req.user.id,
          project_name: repo.project_name,
          tech_stack: repo.tech_stack,
          github_url: repo.github_url,
        },
      });

      savedProjects.push(project);
    }

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