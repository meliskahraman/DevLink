const { ArchitectureNote, Project } = require("../models");

const addArchitectureNote = async (req, res) => {
  try {
    const { project_id, note_content } = req.body;

    if (!project_id || !note_content) {
      return res.status(400).json({
        message: "project_id and note_content are required",
      });
    }

    const project = await Project.findOne({
      where: {
        id: project_id,
        user_id: req.user.id,
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found or access denied",
      });
    }

    const note = await ArchitectureNote.create({
      project_id,
      note_content,
    });

    res.status(201).json({
      message: "Architecture note added successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add architecture note",
      error: error.message,
    });
  }
};

const getArchitectureNotes = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        user_id: req.user.id,
      },
      attributes: ["id", "project_name"],
    });

    const projectIds = projects.map((project) => project.id);

    const notes = await ArchitectureNote.findAll({
      where: {
        project_id: projectIds,
      },
      order: [["id", "DESC"]],
    });

    const notesWithProjectNames = notes.map((note) => {
      const project = projects.find(
        (p) => String(p.id) === String(note.project_id)
      );

      return {
        ...note.toJSON(),
        project_name: project?.project_name || "Unknown Project",
      };
    });

    res.status(200).json({
      notes: notesWithProjectNames,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch architecture notes",
      error: error.message,
    });
  }
};

module.exports = {
  addArchitectureNote,
  getArchitectureNotes,
};