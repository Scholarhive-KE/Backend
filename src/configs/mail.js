const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

const environment = process.env.NODE_ENV || "development";
// Set Environment Variables
const envFileName = `.env.${environment}`;
dotenv.config({
  path: envFileName,
});

let config = {
  service: "gmail",
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
};

let transporter = nodemailer.createTransport(config);

exports.sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.APP_USER,
    to,
    subject,
    html,
  };

  const info = transporter.sendMail(mailOptions);
  return info;
};
