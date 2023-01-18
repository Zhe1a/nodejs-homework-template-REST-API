const Joi = require("joi");

const contactSchemaUpp = Joi.object({
  id: Joi.string().regex(/^[0-9]*$/),
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().regex(/^[0-9]*$/),
});

const contactSchema = Joi.object({
  id: Joi.string().regex(/^[0-9]*$/),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[0-9]*$/)
    .required(),
});

module.exports = {
  contactSchema,
  contactSchemaUpp,
};
