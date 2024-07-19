const express = require("express");
const profileController = require("../controllers/profileController");

const { authenticateJWT } = require("../middlewares/authMiddleware");
const {
  validateChangePassword,
  validateUpdateProfile,
} = require("../middlewares/validators/profileValidator");

const router = express.Router();

// Read my profile
router.get("/", authenticateJWT, profileController.getProfile);

// Update a profile
router.put(
  "/",
  authenticateJWT,
  validateUpdateProfile,
  profileController.updateProfile
);

// Update password
router.put(
  "/change-password",
  authenticateJWT,
  validateChangePassword,
  profileController.updatePassword
);

// Delete a profile
router.delete("/", authenticateJWT, profileController.deleteProfile);

// Export the router
module.exports = router;
