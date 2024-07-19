const Profile = require("../models/ProfileModel");
const Student = require("../models/StudentModel");

// Get my student Profile
exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const student = await Student.findOne({ profile: userId });
    if (student) {
      return res.status(200).json({
        data: student,
        status: "success",
      });
    } else {
      return res.status(404).json({
        message: "Student not found",
      });
    }
  } catch {
    res.status(500).json({
      data: { error: err.message },
      message: "Server Error",
      status: "error",
    });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { DOB, citizenship, gender, educationLevel, courseInterest } =
      req.body;

    // Check if the profile already has a student
    const existingStudent = await Student.findOne({ profile: userId });
    if (existingStudent) {
      return res.status(400).json({ message: "Profile already has a student" });
    }

    const student = new Student({
      DOB,
      citizenship,
      gender,
      educationLevel,
      courseInterest,
      profile: userId,
    });

    await student.save();

    await Profile.findOneAndUpdate({ _id: userId }, { role: "student" });

    res.status(201).json({
      data: student,
      message: "Student created successfully",
      status: "success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      data: { error: err.message },
      message: "Server Error",
      status: "error",
    });
  }
};

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("profile");
    res.status(201).json({
      data: students,
      status: "success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      data: { error: err.message },
      message: "Server Error",
      status: "error",
    });
  }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("profile");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(201).json({
      data: student,

      status: "success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const { DOB, citizenship, gender, educationLevel, courseInterest } =
      req.body;

    let student = await Student.findOne({ profile: req.user._id });
    if (!student) {
      return res
        .status(404)
        .json({ status: "error", message: "Student not found" });
    }

    student.DOB = DOB || student.DOB;
    student.citizenship = citizenship || student.citizenship;
    student.gender = gender || student.gender;
    student.educationLevel = educationLevel || student.educationLevel;
    student.courseInterest = courseInterest || student.courseInterest;

    await student.save();
    res.status(200).json({
      data: student,
      status: "success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      data: { error: err.message },
      message: "Server Error",
      status: "error",
    });
  }
};
