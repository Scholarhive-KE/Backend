const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  DOB: {
    type: Date,
    required: true,
  },
  citizenship: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  educationLevel: {
    type: String,
    enum: ["bachelors", "masters"],
    required: true,
  },
  courseInterest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  status: {
    type: String,
    enum: ["blocked", "approved"],
    default: "approved",
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StudentModel = mongoose.model("Student", studentSchema);

module.exports = StudentModel;
