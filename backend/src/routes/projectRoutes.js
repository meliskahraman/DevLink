const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { syncProjects } = require("../controllers/projectController");

const router = express.Router();

router.post("/sync", authMiddleware, syncProjects);

module.exports = router;