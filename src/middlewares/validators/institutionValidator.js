const Joi = require("joi");

const institutionSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  website: Joi.string().required().messages({
    "string.empty": "Website is required",
    "any.required": "Website is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
}).unknown(false);

const validateInstitution = (req, res, next) => {
  const { error } = institutionSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

module.exports = validateInstitution;
