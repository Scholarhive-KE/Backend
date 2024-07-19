const express = require("express");
const adminController = require("../controllers/adminController");
const {
  authenticateJWT,
  authenticateAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new admin
router.post(
  "/",
  authenticateJWT,
  authenticateAdmin,
  adminController.createAdmin
);

module.exports = router;
