const Joi = require("joi");

const avatarsSchema = Joi.object({
  avatarName: Joi.string(),
});
const emailSchema = Joi.object({
  email: Joi.string().required,
});

module.exports = { avatarsSchema, emailSchema };
