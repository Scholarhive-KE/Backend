const Rating = require("../models/RatingModel");
const Scholarship = require("../models/ScholarshipModel");
const Student = require("../models/StudentModel");

// Function to get all ratings of a scholarship
exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ scholarship: req.params.id }).populate({
      path: "student",
      select: "profile",
      populate: {
        path: "profile",
        select: "surname otherNames",
      },
    });
    res.status(200).json({ message: "success", data: { ratings } });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
};

exports.getRatingById = async (req, res) => {
  try {
    const ratingId = req.params.id;
    const rating = Rating.findById(ratingId);

    if (!rating) {
      return res
        .status(404)
        .json({ status: "error", message: "Rating not found" });
    }
    res.status(200).json(rating);
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch rating" });
  }
};

exports.createRating = async (req, res) => {
  try {
    const scholarship = req.params.id;
    const { rating, comment } = req.body;
    const scholarshipExists = await Scholarship.findById(scholarship);

    if (!scholarshipExists) {
      return res
        .status(404)
        .json({ status: "error", message: "Scholarship not found" });
    }

    const studentProfile = await Student.findOne({ profile: req.user._id });
    if (!studentProfile) {
      return res
        .status(404)
        .json({ status: "error", message: "Student not found" });
    }

    const ratingByUserExists = await Rating.findOne({
      student: studentProfile._id,
      scholarship: scholarship,
    });
    if (ratingByUserExists) {
      return res
        .status(400)
        .json({ status: "error", message: "Rating already exists" });
    }
    const newRating = new Rating({
      rating,
      comment,
      scholarship,
      student: studentProfile._id,
    });
    await newRating.save();
    res.status(200).json({ data: { rating: newRating }, status: "success" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

exports.deleteRatingById = async (req, res) => {
  const studentProfile = await Student.findOne({ profile: req.user._id });
  if (!studentProfile) {
    return res
      .status(404)
      .json({ status: "error", message: "Student not found" });
  }
  try {
    const deletedRating = await Rating.findByIdAndDelete({
      _id: req.params.id,
      student: studentProfile._id,
    });
    if (!deletedRating) {
      return res
        .status(404)
        .json({ status: "error", message: "Rating not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Rating deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to delete rating" });
  }
};
