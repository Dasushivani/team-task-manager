const express = require("express");
const cors = require("cors");
require("dotenv").config();

console.log("JWT SECRET:", process.env.JWT_SECRET);

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// connect database
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// auth routes
app.use("/api/auth", authRoutes);

// task routes
app.use("/api/tasks", taskRoutes);

// test route
app.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});

// server port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});