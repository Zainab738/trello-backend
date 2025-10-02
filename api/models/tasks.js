const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  deadline: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});
module.exports = mongoose.model("Tasks", taskSchema);
