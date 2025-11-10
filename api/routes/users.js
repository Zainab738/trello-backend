const express = require("express");
const router = express.Router();
const validateUser = require("../middleware/userSchemaValidation");
const validation = require("../middleware/validation");
const userController = require("../controller/userController");
const checkAuth = require("../middleware/checkAuth");
const SignupCheckAuth = require("../middleware/SignupCheckAuth");

router.post("/signup", validation(validateUser), userController.signup);
router.post("/login", userController.login);
router.get("/generate-upload-url", userController.url);
router.post("/ResetPassword", userController.PasswordVerificationEmail);
router.post("/UpdatePassword", SignupCheckAuth, userController.updatePassword);
router.get(
  "/verification-success",
  SignupCheckAuth,
  userController.verifyToken
);
router.get("/getUser", checkAuth, userController.getUser);

module.exports = router;
