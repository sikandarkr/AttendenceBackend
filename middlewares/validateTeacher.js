const { success, error } = require('../utils/response');

const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().max(10).required()
});

module.exports = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ "success": false, message: error.details[0].message });
  }
  next();
};
