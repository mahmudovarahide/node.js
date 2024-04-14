const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  signUpValidation,
  loginValidation,
} = require("../middleware/validators");

//=>Login
router.get("/login", authController.getLogin);
router.post("/login", loginValidation, authController.postLogin);
router.post("/logout", authController.postLogout);

//=>Sign Up
router.get("/signup", authController.getSignUp);
router.post("/signup", signUpValidation, authController.postSignUp);

//=>Reset
router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
