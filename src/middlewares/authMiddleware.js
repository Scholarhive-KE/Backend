const passport = require("passport");
// const redisClient = require("../configs/redis");

exports.authenticateLocal = passport.authenticate("local", { session: false });

exports.authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    // const token = req.headers.authorization.split(" ")[1];
    // const isBlacklisted = await redisClient.get(token);

    // if (isBlacklisted) {
    //   return res
    //     .status(401)
    //     .json({ status: "error", message: "Token is blacklisted" });
    // }

    req.user = user;
    next();
  })(req, res, next);
};

exports.authenticateAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ status: "error", message: "Forbidden" });
  }
  next();
};
