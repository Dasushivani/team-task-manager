const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

/* Database Connection */
connectDB();

/* Middleware */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://team-task-manager-gamma-blue.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

/* Test Route */
app.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});