const mongoose = require("mongoose");

const institutionAdminSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InstitutionAdmin = mongoose.model(
  "InstitutionAdmin",
  institutionAdminSchema
);

module.exports = InstitutionAdmin;
