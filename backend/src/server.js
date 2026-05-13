const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
require("./models");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

// Auth API Routes
app.use("/api/auth", authRoutes);

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