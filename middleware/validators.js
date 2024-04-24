const { check, body } = require("express-validator");
const User = require("../models/user");

exports.signUpValidation = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password", "Please enter min 6 characters")
    .isLength({ min: 6 })
    .isAlphanumeric()
    .trim(),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords have to match");
    }
    return true;
  }),
];

exports.loginValidation = [
  check("email").isEmail().withMessage("Please enter a valid email"),
  body("password", "Please enter min 6 characters")
    .isLength({ min: 6 })
    .isAlphanumeric()
    .trim(),
];

exports.addProductValidation = [
  body("title", "Title must be alphanumeric and at least 3 characters long")
    .isString()
    .isLength({ min: 3 })
    .trim(),
  body("price", "Price must be a valid number").isFloat(),
  body("description", "Description must be between 5 to 100 characters")
    .isLength({ min: 5, max: 100 })
    .trim(),
];

exports.editProductValidation = [
  body("title", "Title must be alphanumeric and at least 3 characters long")
    .isString()
    .isLength({ min: 3 })
    .trim(),
  body("price", "Price must be a valid number").isFloat(),
  body("description", "Description must be between 5 to 100 characters")
    .isLength({ min: 5, max: 100 })
    .trim(),
];
