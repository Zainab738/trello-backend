const Task = require("../models/tasks");
const mongoose = require("mongoose");
const express = require("express");

//create
exports.createTask = (req, res, next) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    deadline: req.body.deadline,
    project: req.body.project,
  });
  task.save().then((task) => {
    res.status(201).json({ message: "task saved", task: task });
  });
};

//del
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "coulndt find it " });
    }
    res.status(200).json({ message: "task deleted successfully", task });
  } catch (err) {
    res.status(500).json({ message: "error", error: err });
    console.log(err);
  }
};

//update
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ message: "updated", task: task });
  } catch (err) {
    res.status(500).json({ message: "error", error: err });
    console.log(err);
  }
};

//get
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.find({ project: req.params.project });
    if (!task || task.length === 0) {
      return res.status(404).json({ message: "no tasks yet" });
    }
    res.status(200).json({ message: "task fetched successfully", task });
  } catch (err) {
    res.status(500).json({ message: "error", error: err });
    console.log(err);
  }
};
