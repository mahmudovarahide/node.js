const { check, body } = require("express-validator");
const User = require("../models/user");

exports.signUpValidation = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject(
            "Email exists already, please pick a different email"
          );
        }
      });
    })
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
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("Wrong email address");
        }
      });
    })
    .normalizeEmail(),
  body("password", "Please enter min 6 characters")
    .isLength({ min: 6 })
    .isAlphanumeric()
    .trim(),
];
