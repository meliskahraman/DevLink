const { User, Project, ArchitectureNote } = require("../models");
const { Op } = require("sequelize");

const filterCandidates = async (req, res) => {
  try {
    const { tech } = req.query;

    const whereClause = {};

    if (tech) {
      whereClause.tech_stack = {
        [Op.iLike]: `%${tech}%`,
      };
    }

    const projects = await Project.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ["id", "email", "role"],
        },
        {
          model: ArchitectureNote,
          attributes: ["id", "note_content"],
        },
      ],
      order: [["project_name", "ASC"]],
    });

    const candidates = projects.map((project) => ({
      developer_email: project.User?.email,
      project_name: project.project_name,
      tech_stack: project.tech_stack,
      github_url: project.github_url,
      architecture_notes: project.ArchitectureNotes.map(
        (note) => note.note_content
      ),
    }));

    res.status(200).json({
      count: candidates.length,
      candidates,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to filter candidates",
      error: error.message,
    });
  }
};

module.exports = {
  filterCandidates,
};