const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentControllers");
const validateStudent = require("../middlewares/validators/studentValidator");
const {
  authenticateJWT,
  authenticateAdmin,
} = require("../middlewares/authMiddleware");

router.use(authenticateJWT);

// Get my student Profile
router.get("/me", studentController.getMyProfile);

// Create a new student
router.post("/", validateStudent, studentController.createStudent);

// Get all students
router.get("/", authenticateAdmin, studentController.getStudents);

// Get a student by ID
router.get("/:id", authenticateAdmin, studentController.getStudentById);

// Update a student
router.put("/", validateStudent, studentController.updateStudent);

module.exports = router;
