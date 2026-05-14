const axios = require("axios");

const syncGithubRepos = async (username) => {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "DevLink-App",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      { headers }
    );

    return response.data.map((repo) => ({
      project_name: repo.name,
      tech_stack: repo.language || "Unknown",
      github_url: repo.html_url,
    }));
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error(
        "GitHub API rate limit exceeded. Please check GITHUB_TOKEN on Render."
      );
    }

    if (error.response?.status === 404) {
      throw new Error("GitHub user not found.");
    }

    throw new Error(error.response?.data?.message || "GitHub API request failed.");
  }
};

module.exports = {
  syncGithubRepos,
};