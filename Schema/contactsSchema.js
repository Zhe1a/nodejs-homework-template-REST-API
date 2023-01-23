const Joi = require("joi");

const contactSchemaUpp = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().regex(/^[0-9]*$/),
});

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[0-9]*$/)
    .required(),
  owner: Joi.string(),
});

module.exports = {
  contactSchema,
  contactSchemaUpp,
};
