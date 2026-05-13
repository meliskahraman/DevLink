const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tech_stack: {
      type: DataTypes.STRING,
    },
    github_url: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "projects",
    timestamps: false,
  }
);

module.exports = Project;