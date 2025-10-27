const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const mongoose = require("mongoose");
const validateUser = require("../middleware/userSchemaValidation");
const validation = require("../middleware/validation");
const userController = require("../controller/userController");
const upload = require("../../config/multercloudinary");
const checkAuth = require("../middleware/checkAuth");
const fileValidation = require("../middleware/fileValidation");
const SignupCheckAuth = require("../middleware/SignupCheckAuth");

router.post(
  "/signup",
  fileValidation,
  validation(validateUser),
  userController.signup
);

router.post("/login", userController.login);
router.get("/getUser", checkAuth, userController.getUser);
router.get(
  "/verification-success",
  SignupCheckAuth,
  userController.verifyToken
);
router.post("/ResetPassword", userController.PasswordVerificationEmail);
router.post("/UpdatePassword", SignupCheckAuth, userController.updatePassword);
module.exports = router;
