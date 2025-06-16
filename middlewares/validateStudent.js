const Joi = require('joi');
const studentSchema = Joi.object({
  name: Joi.string().max(100).required(),
  roll_number: Joi.string().required(),
  class_id: Joi.number().integer().required(),
  section: Joi.string().max(10).required(),
  admission_number: Joi.string().required()
});

module.exports = (req, res, next) => {
  const { error } = studentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};
