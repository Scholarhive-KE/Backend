const Joi = require("joi");

const scholarshipRatingSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().required(),
}).unknown(false);

exports.validateRating = (req, res, next) => {
  const { error } = scholarshipRatingSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
  next();
};
