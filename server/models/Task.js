
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    subject: {
        type: String,
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },

    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
    },

    dueDate: {
        type: Date
    }

}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
