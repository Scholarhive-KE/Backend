const Course = require("../models/CourseModel");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { name, description } = req.body;
    const course = await Course.create({ name, description });
    res.status(201).json({ success: true, data: { course } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ status: "success", data: { courses } });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId);
  if (!course) {
    return res
      .status(404)
      .json({ status: "error", messaage: "Course not found" });
  }
  res.status(200).json({ status: "success", data: { course } });
};

// Update a course by ID
exports.updateCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { name, description } = req.body;
    const course = await Course.findByIdAndUpdate(
      courseId,
      { name, description },
      { new: true }
    );
    if (!course) {
      return res
        .status(404)
        .json({ status: "error", message: "Course not found" });
    }
    res.status(200).json({ status: "success", data: { course } });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
