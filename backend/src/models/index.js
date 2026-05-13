const User = require("./User");
const Project = require("./Project");
const ArchitectureNote = require("./ArchitectureNote");

User.hasMany(Project, { foreignKey: "user_id" });
Project.belongsTo(User, { foreignKey: "user_id" });

Project.hasMany(ArchitectureNote, { foreignKey: "project_id" });
ArchitectureNote.belongsTo(Project, { foreignKey: "project_id" });

module.exports = {
  User,
  Project,
  ArchitectureNote,
};