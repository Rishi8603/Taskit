const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Atlas connected"))
    .catch(err => console.error("MongoDB connection error:", err));
};

module.exports = connectDB;