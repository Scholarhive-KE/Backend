const Joi = require("joi");

const updateProfileSchema = Joi.object({
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
}).unknown(false);

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),
  newPassword: Joi.string().min(8).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("newPassword")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm password is required",
  }),
}).unknown(false);

exports.validateUpdateProfile = (req, res, next) => {
  const { error } = updateProfileSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", data: errorMessage });
  }
  next();
};

exports.validateChangePassword = (req, res, next) => {
  const { error } = changePasswordSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", data: errorMessage });
  }
  next();
};
