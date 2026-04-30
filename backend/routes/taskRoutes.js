const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/add", async (req, res) => {
  try {
    const { title, dueDate } = req.body;

    const task = new Task({
      title,
      dueDate,
      status: "Pending",
    });

    await task.save();

    res.json({ message: "Task added" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.json({ message: error.message });
  }
});
router.put("/complete/:id", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, {
    status: "Completed",
  });

  res.json({ message: "Task completed" });
});

router.delete("/delete/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.json({ message: "Task deleted" });
});
module.exports = router;