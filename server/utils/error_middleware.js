const { body, validationResult } = require("express-validator");

// Reusable validation function for multiple fields
const validateFields = (fields) => {
  return fields.map((field) =>
    body(field)
      .notEmpty()
      .withMessage(`${field} is required`)
      .trim()
      .escape()
  );
};

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
        msg: err.msg,
        location: err.location
      }));
    return res.status(400).json({ success: false, errors: formattedErrors });
  }
  next();
};

module.exports = { validateFields, handleValidationErrors };
