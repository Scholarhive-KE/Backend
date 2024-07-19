const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ProfileSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  other_names: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProfileSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

ProfileSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
