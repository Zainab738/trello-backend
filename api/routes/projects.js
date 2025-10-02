const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const projectControllers = require("../controller/projectsController");
const validateProject = require("../middleware/projectSchemaValidation");
const validation = require("../middleware/validation");

router.post(
  "/create",
  validation(validateProject),
  checkAuth,
  projectControllers.createProject
);

router.get("/getprojects", checkAuth, projectControllers.getProject);

router.delete(
  "/deleteprojects/:id",
  checkAuth,
  projectControllers.deleteProject
);

module.exports = router;
