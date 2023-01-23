const Joi = require("joi");


const avatarsSchema = Joi.object({
    avatarName: Joi.string(),
});

module.exports = avatarsSchema