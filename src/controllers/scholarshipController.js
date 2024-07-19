const Institution = require("../models/InstitutionModel");
const Scholarship = require("../models/ScholarshipModel");
const Course = require("../models/CourseModel");
const InstutionAdmin = require("../models/InstitutionAdminModel");

// Create a new scholarship
exports.createScholarship = async (req, res) => {
  try {
    const {
      name,
      description,
      deadline,
      awardAmount,
      levelOfEducation,
      courseInterest,
      type,
      applicationLink,
    } = req.body;

    const admin = await InstutionAdmin.findOne({ profile: req.user._id });
    if (!admin) {
      return res.status(403).json({
        status: "error",
        message: "User is not authorized to create this scholarship.",
      });
    }
    const institution = await Institution.findById(admin.institution);
    if (!institution) {
      return res.status(400).json({
        message: "Institution not found",
        status: "error",
      });
    }
    if (institution.status !== "approved") {
      return res.status(400).json({
        message: "Institution must be approved to create a scholarship.",
        status: "error",
      });
    }
    const course = Course.findById(courseInterest);
    if (!course) {
      return res.status(400).json({
        message: "Course interest must be a valid course.",
        status: "error",
      });
    }
    const scholarship = new Scholarship({
      name,
      description,
      deadline,
      awardAmount,
      levelOfEducation,
      courseInterest,
      type,
      applicationLink,
      institution: admin.institution,
      author: admin._id,
    });
    await scholarship.save();
    res.status(201).json({
      data: { scholarship },
      message: "Created Successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "error",
    });
  }
};

// Get all scholarships
exports.getAllScholarships = async (req, res) => {
  try {
    let scholarships;
    if (req.user.role == "institutionAdmin") {
      const admin = await InstutionAdmin.findOne({ profile: req.user._id });

      scholarships = await Scholarship.find({
        institution: admin.institution,
      }).populate("institution courseInterest");
    } else {
      scholarships = await Scholarship.find().populate(
        "institution courseInterest"
      );
    }

    res.status(200).json({
      data: { scholarships },
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "error",
    });
  }
};

// Get a specific scholarship by ID
exports.getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id).populate(
      "institution courseInterest"
    );
    if (!scholarship) {
      return res
        .status(404)
        .json({ message: "Scholarship not found", status: "error" });
    }
    res.status(200).json({
      data: { scholarship },
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "error",
    });
  }
};

// Update a specific scholarship by ID
exports.updateScholarshipById = async (req, res) => {
  try {
    const {
      name,
      description,
      deadline,
      awardAmount,
      levelOfEducation,
      courseInterest,
      type,
      applicationLink,
    } = req.body;

    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res
        .status(404)
        .json({ message: "Scholarship not found", status: "error" });
    }

    const admin = await InstutionAdmin.findOne({ profile: req.user._id });
    if (!admin) {
      return res.status(403).json({
        status: "error",
        message: "User is not authorized to edit this scholarship.",
      });
    }

    if (admin.institution.toString() != scholarship.institution.toString()) {
      return res.status(403).json({
        status: "error",
        message: "User is not authorized to edit this scholarship.",
      });
    }
    const course = Course.findById(courseInterest);
    if (!course) {
      return res.status(400).json({
        message: "Course interest must be a valid course.",
        status: "error",
      });
    }
    scholarship.name = name || scholarship.name;
    scholarship.description = description || scholarship.description;
    scholarship.deadline = deadline || scholarship.deadline;
    scholarship.awardAmount = awardAmount || scholarship.awardAmount;
    scholarship.levelOfEducation =
      levelOfEducation || scholarship.levelOfEducation;
    scholarship.courseInterest = courseInterest || scholarship.courseInterest;
    scholarship.type = type || scholarship.type;
    scholarship.applicationLink =
      applicationLink || scholarship.applicationLink;

    await scholarship.save();

    res.status(200).json({
      data: { scholarship: { ...scholarship, courseInterest: course } },
      message: "Updated Successfully Successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "error",
    });
  }
};

// Delete a specific scholarship by ID
exports.deleteScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res
        .status(404)
        .json({ message: "Scholarship not found", status: "error" });
    }

    const admin = await InstutionAdmin.findOne({ profile: req.user._id });
    if (!admin) {
      return res.status(403).json({
        status: "error",
        message: "User is not authorized to edit this scholarship.",
      });
    }

    if (admin.institution.toString() != scholarship.institution.toString()) {
      return res.status(403).json({
        status: "error",
        message: "User is not authorized to edit this scholarship.",
      });
    }

    await scholarship.deleteOne();
    res.status(201).json({
      message: "Scholarship Removed",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "error",
    });
  }
};
