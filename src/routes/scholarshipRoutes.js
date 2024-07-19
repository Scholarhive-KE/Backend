const express = require("express");
const scholarshipController = require("../controllers/scholarshipController");
const ratingsController = require("../controllers/ratingsController");

const { authenticateJWT } = require("../middlewares/authMiddleware");
const {
  validateScholarship,
} = require("../middlewares/validators/scholarshipValidator");
const { validateRating } = require("../middlewares/validators/ratingValidator");

const router = express.Router();

router.get("/", authenticateJWT, scholarshipController.getAllScholarships);

router.get("/:id", authenticateJWT, scholarshipController.getScholarshipById);

router.post(
  "/",
  authenticateJWT,
  validateScholarship,
  scholarshipController.createScholarship
);

router.put(
  "/:id",
  authenticateJWT,
  validateScholarship,
  scholarshipController.updateScholarshipById
);

router.delete(
  "/:id",
  authenticateJWT,
  scholarshipController.deleteScholarshipById
);

router.post(
  "/:id/rating",
  authenticateJWT,
  validateRating,
  ratingsController.createRating
);

router.get("/:id/rating", authenticateJWT, ratingsController.getAllRatings);

router.delete(
  "/rating/:id",
  authenticateJWT,
  ratingsController.deleteRatingById
);

module.exports = router;
