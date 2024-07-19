const Joi = require("joi");

// Define the Joi schema
const registerSchema = Joi.object({
  surname: Joi.string().min(2).required().messages({
    "string.empty": "Surname is required",
    "string.min": "Surname must be at least 2 characters",
  }),
  otherNames: Joi.string().min(2).required().messages({
    "string.empty": "Other names are required",
    "string.min": "Other names must be at least 2 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please include a valid email",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm password is required",
  }),
}).unknown(false);

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please include a valid email",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
}).unknown(false);

// Middleware function to validate the registration data
exports.validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", data: errorMessage });
  }
  next();
};

// Middleware function to validate the login data
exports.validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", data: errorMessage });
  }
  next();
};
