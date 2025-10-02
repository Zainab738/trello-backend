const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./api/routes/users");
const projectRoute = require("./api/routes/projects");
const taskRoute = require("./api/routes/tasks");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoute);
app.use("/projects", projectRoute);
app.use("/tasks", taskRoute);

connectDB();

module.exports = app;
