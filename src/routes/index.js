const express = require("express");
const router = express.Router();

const adminRoute = require("./adminRoutes");
const authRoute = require("./authRoutes");
const coursesRoute = require("./coursesRoutes");
const instituteRoute = require("./institutionRoutes");
const scholarshipsRoute = require("./scholarshipRoutes");
const studentsRoute = require("./studentRoutes");
const profileRoute = require("./profileRoutes");

router.use("/auth", authRoute);
router.use("/admin", adminRoute);
router.use("/courses", coursesRoute);
router.use("/institution", instituteRoute);
router.use("/scholarships", scholarshipsRoute);
router.use("/students", studentsRoute);
router.use("/profile", profileRoute);

module.exports = router;
