const { application } = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const scholarshipSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  awardAmount: { type: Number },
  levelOfEducation: { type: String, required: true },
  applicationLink: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["full", "partial"],
  },
  courseInterest: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  institution: {
    type: Schema.Types.ObjectId,
    ref: "Institution",
    required: true,
  },
});

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

module.exports = Scholarship;
