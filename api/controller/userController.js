const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const mongoose = require("mongoose");

//signup
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: err });
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      username: req.body.username,
      password: hash,
    });
    user
      .save()
      .then((user) => res.status(201).json({ message: "User created", user }))
      .catch((err) => res.status(500).json({ error: err }));
  });
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
        const token = jwt.sign(
          { email: user.email, userid: user._id, username: user.username },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ message: "auth success", token });
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
