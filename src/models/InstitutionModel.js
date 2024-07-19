const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "blocked", "approved"],
    default: "pending",
  },
});

const Institution = mongoose.model("Institution", institutionSchema);

module.exports = Institution;
