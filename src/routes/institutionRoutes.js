const express = require("express");
const institutionController = require("../controllers/institutionController");
const router = express.Router();

const {
  authenticateJWT,
  authenticateAdmin,
} = require("../middlewares/authMiddleware");
const validateInstitution = require("../middlewares/validators/institutionValidator");

router.use(authenticateJWT);

// Create a new institution
router.post("/", validateInstitution, institutionController.createInstitution);

router.post("/admin", institutionController.addInstutionAdmin);

router.get("/admin", institutionController.getInstitutionAdmins);

// Get a my institution
router.get("/me", institutionController.getMyInstitution);

// Get all institutions
router.get("/", institutionController.getInstitutions);

// Get a single institution
router.get("/:id", institutionController.getInstitutionById);

// Update an institution
router.put("/", validateInstitution, institutionController.updateInstitution);

// Delete an institution
router.delete("/:id", institutionController.deleteInstitution);

// Change the status of an institution
router.put(
  "/:id/status",
  authenticateAdmin,
  institutionController.changeInstitutionStatus
);

module.exports = router;
