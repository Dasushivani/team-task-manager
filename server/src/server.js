const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration (allows all localhost ports + deployed frontend)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Thunder Client, Postman, mobile apps)
      if (!origin) return callback(null, true);

      // Allow any localhost port during development
      if (
        origin.startsWith("http://localhost:") ||
        origin === "https://team-task-manager-gamma-blue.vercel.app"
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Database connection failed:", err.message);
  });

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});