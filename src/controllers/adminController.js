const Profile = require("../models/ProfileModel");

exports.createAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    const profile = await Profile.findOne({ email });

    if (!profile) {
      return res
        .status(404)
        .json({ status: "error", message: "Profile not found" });
    }

    // Update the role to admin
    profile.role = "admin";

    // Save the updated profile
    await profile.save();

    // Return the updated profile
    return res.status(200).json({
      message: "Profile role updated to admin",
      data: { profile },
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "error",
      status: "error",
      data: { error: error.message },
    });
  }
};
