const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

const {
  authenticateJWT,
  authenticateAdmin,
} = require("../middlewares/authMiddleware");

router.use(authenticateJWT);

// Create a new course
router.post("/", authenticateAdmin, courseController.createCourse);

// Read all courses
router.get("/", courseController.getAllCourses);

// Read a specific course
router.get("/:id", courseController.getCourseById);

// Update a course
router.put("/:id", authenticateAdmin, courseController.updateCourseById);

// Export the router
module.exports = router;
