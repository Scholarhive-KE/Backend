const Joi = require("joi");

const courseSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

exports.validateCourse = (req, res, next) => {
  const { error } = courseSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
  next();
};
