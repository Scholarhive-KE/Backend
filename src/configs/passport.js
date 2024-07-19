const passport = require("passport");
const dotenv = require("dotenv");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Profile = require("../models/ProfileModel");

const environment = process.env.NODE_ENV || "development";
// Set Environment Variables
const envFileName = `.env.${environment}`;
dotenv.config({
  path: envFileName,
});

// Strategy for handling local login
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const profile = await Profile.findOne({ email });
        if (!profile) {
          return done(null, false, { message: "Invalid email or password." });
        }
        const isMatch = await profile.matchPassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password." });
        }
        return done(null, profile);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Options for JWT Strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// Strategy for handling JWT in requests
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await Profile.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
