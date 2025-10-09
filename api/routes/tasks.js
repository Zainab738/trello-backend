const express = require("express");
const router = express.Router();
const Task = require("../models/tasks");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/checkAuth");
const taskControllers = require("../controller/taskController");
const validateTask = require("../middleware/taskSchemaValidation");
const validation = require("../middleware/validation");

//crete a task
router.post(
  "/create",
  validation(validateTask),
  checkAuth,
  taskControllers.createTask
);

//delete a task
router.delete("/delete/:id", checkAuth, taskControllers.deleteTask);

//get task
router.get("/get/:project", checkAuth, taskControllers.getTask);

//update a task
router.patch(
  "/update/:id",
  validation(validateTask),
  taskControllers.updateTask
);
// updatestatus
router.patch("/update-status/:id", checkAuth, taskControllers.updateStatus);
module.exports = router;
