const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const mongoose = require("mongoose");
const { sendLoginEmail } = require("../../utils/index");
const { VerifyPassword } = require("../../utils/index");

// signup
exports.signup = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      username: req.body.username,
      password: hash,
      profilePic: req.file ? req.file.path : null,
      isverified: false,
    });

    await user.save();

    const token = jwt.sign(
      {
        userid: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    sendLoginEmail(user.email, user.username, token);

    res.status(201).json({
      message: "User created",
      user: user,
      token: token,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//login
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Wrong username or password" });
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err || !result) {
          return res
            .status(401)
            .json({ message: "Wrong username or password" });
        }
        if (user.isverified == true) {
          const token = jwt.sign(
            { email: user.email, userid: user._id, username: user.username },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          res.status(200).json({ message: "login success", token });
        } else {
          res.status(200).json({ message: "please verify your email" });
        }
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

//get user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userData.userid).select(
      "username email profilePic"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
//verification

exports.verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.userData.userid);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.isverified = true;
    await user.save();

    res.status(200).json({ message: "Verified" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
//sendemail
exports.PasswordVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign(
      { userid: user._id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    VerifyPassword(user.email, user.username, token);

    res.status(201).json({
      message: "Reset email sent successfully",
      user: { email: user.email, username: user.username },
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//update password
exports.updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const token = req.query.token;
    if (!password) {
      return res.status(400).json({ message: "Password are required" });
    }

    const decoded = jwt.decode(token);
    if (!decoded || !decoded.userid) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.userid);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
