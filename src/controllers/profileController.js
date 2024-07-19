const Profile = require("../models/ProfileModel");

// Get a single profile of the logged in user
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.user._id });
    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
        status: "error",
      });
    }
    res.status(200).json({
      data: { profile },
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      status: "error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  const { surname, otherNames, email } = req.body;

  try {
    const profile = await Profile.findOne({ _id: req.user._id });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
        status: "error",
      });
    }

    const emailCheck = await Profile.findOne({
      email,
      _id: { $ne: req.user._id },
    });

    if (emailCheck) {
      return res.status(400).json({
        message: "Email Already exists",
        status: "error",
      });
    }

    profile.surname = surname;
    profile.other_names = otherNames;
    profile.email = email;

    await profile.save();
    res.status(200).json({
      data: { profile },
      status: "success",
      message: "Profile updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      status: "error",
    });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const profile = await Profile.findOne({ _id: req.user._id });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
        status: "error",
      });
    }
    const isMatch = await profile.matchPassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect current password",
        status: "error",
      });
    }

    profile.password = newPassword;

    await profile.save();

    res.status(200).json({
      message: "Password updated successfully",
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      status: "error",
    });
  }
};

// Delete a profile of the logged in user
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.user._id });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
        status: "error",
      });
    }

    await profile.remove();
    res.status(201).json({
      message: "Profile Removed",
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      status: "error",
    });
  }
};
