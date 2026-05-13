const axios = require("axios");

const syncGithubRepos = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}/repos`);

  return response.data.map((repo) => ({
    project_name: repo.name,
    tech_stack: repo.language || "Unknown",
    github_url: repo.html_url,
  }));
};

module.exports = {
  syncGithubRepos,
};