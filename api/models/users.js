const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  password: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
    default: null,
  },
  isverified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
