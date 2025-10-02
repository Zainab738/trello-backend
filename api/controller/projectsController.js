const express = require("express");
const Project = require("../models/projects");
const mongoose = require("mongoose");

//create
exports.createProject = async (req, res, next) => {
  const project = new Project({
    title: req.body.title,
    content: req.body.content,
    user: req.userData.userid,
  });

  await project
    .save()
    .then(() => {
      res.status(201).json({ message: "project created" });
    })
    .catch((err) => {
      res.status(500).json({ message: "error occured", error: err });
    });
};

//get
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.find({ user: req.userData.userid });
    if (!project || project.length === 0) {
      return res.status(404).json({ message: "coulndt find it " });
    }
    res.status(200).json({ message: "Project fetched successfully", project });
  } catch (err) {
    res.status(500).json({ message: "error", error: err });
    console.log(err);
  }
};

//delete
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "coulndt find it " });
    }
    res.status(200).json({ message: "Project deleted successfully", project });
  } catch (err) {
    res.status(500).json({ message: "error", error: err });
    console.log(err);
  }
};
