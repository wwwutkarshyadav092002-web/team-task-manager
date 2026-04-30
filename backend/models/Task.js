const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: String,
    status: {
      type: String,
      default: "Pending",
    },
    dueDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);