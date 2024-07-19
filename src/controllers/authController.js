const Profile = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");
// const redisClient = require("../configs/redis");

exports.register = async (req, res) => {
  const { email, password, surname, otherNames } = req.body;
  try {
    let profile = await Profile.findOne({ email });
    if (profile) {
      return res
        .status(400)
        .json({ message: "Profile already exists", status: "error" });
    }
    profile = new Profile({
      email,
      password,
      surname,
      other_names: otherNames,
    });
    await profile.save();
    res.status(201).json({ status: "success", message: "Profile registered" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", status: "error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const user = {
      email: req.user.email,
      name: req.user.surname + " " + req.user.other_names,
      role: req.user.role,
    };

    res.json({
      data: { token, user },
      message: "User logged in successfully",
      status: "success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", status: "error" });
  }
};

// Logout user
exports.logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const exp = decoded.exp;

    // // Store the token in the blacklist with expiration time
    // await redisClient.setEx(
    //   token,
    //   exp - Math.floor(Date.now() / 1000),
    //   "blacklisted"
    // );
    res.json({ status: "success", message: "User logged out successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Reset password
// exports.resetPassword = (req, res) => {
//   // Your code here for resetPassword function
// };
