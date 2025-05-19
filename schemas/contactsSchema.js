const Joi = require("joi");
const mongoose = require("mongoose");

const contactSchema = Joi.object({
  user_id: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.required": "User ID is required",
      "any.invalid": "User ID must be a valid ObjectId",
    }),

  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "any.required": "Please add the name",
    "string.empty": "Please add the name",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Please add the email",
    "string.empty": "Please add the email",
  }),

  phone: Joi.string().required().messages({
    "string.base": "Phone must be a string",
    "any.required": "Please add the phone",
    "string.empty": "Please add the phone",
  }),
});

module.exports = contactSchema;
