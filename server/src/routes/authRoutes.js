const express = require("express");
const router = express.Router();

const {
  signupUser,
  loginUser,
  getAllUsers,
} = require("../controllers/authController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// signup route
router.post("/signup", signupUser);

// login route
router.post("/login", loginUser);

// protected profile route
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Protected profile accessed",
    user: req.user,
  });
});

// admin only route
router.get("/admin", protect, adminOnly, (req, res) => {
  res.status(200).json({
    message: "Welcome Admin",
    user: req.user,
  });
});

// get all users (admin only)
router.get("/users", protect, adminOnly, getAllUsers);

module.exports = router;