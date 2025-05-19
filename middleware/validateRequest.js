const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message.replace(/['"]/g, "")),
    });
  }

  next();
};

module.exports = validate;
