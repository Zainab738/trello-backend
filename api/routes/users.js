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

router.post(
  "/signup",
  upload.single("profilePic"),
  validation(validateUser),
  userController.signup
);

router.post("/login", userController.login);
router.get("/getUser", checkAuth, userController.getUser);

module.exports = router;
