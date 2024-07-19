const express = require("express");
const authController = require("../controllers/authController");
const {
  authenticateLocal,
  authenticateJWT,
} = require("../middlewares/authMiddleware");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validators/authValidator");
const router = express.Router();

// Register a new user
router.post("/register", validateRegister, authController.register);

// Login user
router.post("/login", validateLogin, authenticateLocal, authController.login);

// Logout user
router.post("/logout", authenticateJWT, authController.logout);

// // Reset password
// router.post("/reset-password", authController.resetPassword);

module.exports = router;
