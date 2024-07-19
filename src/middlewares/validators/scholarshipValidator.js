const Joi = require("joi");

const scholarshipSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  deadline: Joi.date().required(),
  awardAmount: Joi.number().integer(),
  levelOfEducation: Joi.string().required(),
  courseInterest: Joi.string().required(),
  applicationLink: Joi.string().required(),
  type: Joi.string().required().valid("full", "partial"),
}).unknown(false);

exports.validateScholarship = (req, res, next) => {
  const { error } = scholarshipSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
  next();
};
