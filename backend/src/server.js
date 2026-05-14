const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const noteRoutes = require("./routes/noteRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");
const authMiddleware = require("./middleware/authMiddleware");
require("./models");

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://dev-link-olive.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// Auth API Routes
app.use("/api/auth", authRoutes);

// Project API Routes
app.use("/api/projects", projectRoutes);

// Architecture Note API Routes
app.use("/api/architecture-notes", noteRoutes);

// Recruiter API Routes
app.use("/api/recruiter", recruiterRoutes);

// Protected Test Route
app.get("/api/protected-test", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

// Test Route
app.get("/", (req, res) => {
  res.send("DevLink API is running");
});

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });