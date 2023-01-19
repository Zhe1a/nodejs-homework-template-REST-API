
const Joi = require("joi");
const { any } = require("joi");


const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const singnupSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.any().allow("starter", "pro", "business"),
});

module.exports = {
  loginSchema,
  singnupSchema,
};
