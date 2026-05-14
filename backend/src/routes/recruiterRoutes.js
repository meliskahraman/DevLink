const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { filterCandidates } = require("../controllers/recruiterController");

const router = express.Router();

router.get("/candidates", authMiddleware, filterCandidates);

module.exports = router;