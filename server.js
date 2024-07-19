const express = require("express");
const router = require("./src/routes/index");
const dotenv = require("dotenv");
const connectDB = require("./src/configs/db");
const passport = require("./src/configs/passport");
const cors = require("cors");

const environment = process.env.NODE_ENV || "development";
// Set Environment Variables
const envFileName = `.env.${environment}`;
dotenv.config({
  path: envFileName,
});

const app = express();
const port = process.env.PORT || 3000;

if (environment !== "test") {
  // Connect to DB
  connectDB();
}
app.use(cors({ origin: "*" }));
// Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passprt (for authentication)
app.use(passport.initialize());

// Routes
app.use("/", router);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
