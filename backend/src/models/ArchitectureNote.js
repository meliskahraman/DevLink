const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ArchitectureNote = sequelize.define(
  "ArchitectureNote",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    note_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "architecture_notes",
    timestamps: false,
  }
);

module.exports = ArchitectureNote;