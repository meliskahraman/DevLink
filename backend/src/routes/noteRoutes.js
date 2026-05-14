const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addArchitectureNote,
  getArchitectureNotes,
} = require("../controllers/noteController");

const router = express.Router();

router.post("/", authMiddleware, addArchitectureNote);
router.get("/", authMiddleware, getArchitectureNotes);

module.exports = router;