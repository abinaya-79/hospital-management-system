const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("CareConnect Backend Running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);

// Error handlers
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

// PORT (declare BEFORE using it)
const PORT = process.env.PORT || 5000;

// Start server ONCE
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});