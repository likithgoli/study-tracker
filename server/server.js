
require("dotenv").config({
    path: require("path").join(__dirname, ".env")
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Study Tracker API is running");
});

// Task routes
app.use("/api/tasks", require("./routes/tasks"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(process.env.PORT, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err.message);
    });
