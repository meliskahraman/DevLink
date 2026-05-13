const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addArchitectureNote } = require("../controllers/noteController");

const router = express.Router();

router.post("/", authMiddleware, addArchitectureNote);

module.exports = router;