const Joi = require('joi');

const validator = (schema) => (req, res, next) => {
  const body = req.body;
  const validation = schema.validate(body);

  if (validation.error) {
    res.status(400).send(validation.error);
    return;
  }

  return next();
};

const contactSchemaUpp = Joi.object({
  id: Joi.string().regex(/^[0-9]*$/),
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().regex(/^[0-9]*$/),
});

const contactSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9]*$/)
    .required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[0-9]*$/)
    .required(),
});

module.exports = {
  validator,
  contactSchema,
  contactSchemaUpp,
};
