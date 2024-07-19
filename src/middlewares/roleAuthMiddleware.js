const passport = require("passport");
// const redisClient = require("../configs/redis");

exports.authenticateLocal = passport.authenticate("local", { session: false });

exports.authenticateAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ status: "error", message: "Unauthorized to access resource" });
  }
  next();
};

exports.authenticateInstitutionAdmin = (req, res, next) => {
  if (req.user.role !== "InstitutionAdmin") {
    return res
      .status(403)
      .json({ status: "error", message: "Unauthorized to access resource" });
  }
  next();
};
