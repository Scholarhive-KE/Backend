const Joi = require("joi");

const studentSchema = Joi.object({
  DOB: Joi.date().required().messages({
    "date.base": "DOB must be a valid date",
    "any.required": "Date of birth is required",
  }),
  citizenship: Joi.string().required().messages({
    "string.empty": "Citizenship is required",
    "any.required": "Citizenship is required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "Gender must be one of [male, female, other]",
    "any.required": "Gender is required",
  }),
  educationLevel: Joi.string()
    .valid("highschool", "bachelors", "masters")
    .required()
    .messages({
      "any.only":
        "Education Level must be one of [highschool, bachelors, masters]",
      "any.required": "Education Level is required",
    }),
  courseInterest: Joi.string().optional(),
}).unknown(false);

const validateStudent = (req, res, next) => {
  const { error } = studentSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message);
    return res.status(400).json({
      data: errorMessage,
      message: "Validation Error",
      status: "error",
    });
  }
  next();
};

module.exports = validateStudent;
