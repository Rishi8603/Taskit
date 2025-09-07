const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// GET all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();   // MongoDB se laa raha hai
    // _id ko id me convert kar rahe hain
    const tasksWithId = tasks.map(task => ({
      id: task._id,
      text: task.text,
      completed: task.completed
    }));
    res.json(tasksWithId);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new task
router.post('/tasks', async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({ message: "Task text is required" });
    }
    
    const newTask = new Task({
      text: req.body.text
    });
    await newTask.save();   // MongoDB me save

    res.status(201).json({
      id: newTask._id,
      text: newTask.text,
      completed: newTask.completed
    });

    console.log('Task added:', newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task deleted successfully",
      id: deletedTask._id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update task
router.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      id: updatedTask._id,
      text: updatedTask.text,
      completed: updatedTask.completed
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;