const express=require('express')
const cors=require('cors')
const app = express()
const mongoose = require("mongoose"); 
mongoose.connect("mongodb://127.0.0.1:27017/todoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },   // task ka naam
  completed: { type: Boolean, default: false }  // by default false rahega
});

const Task = mongoose.model("Task", taskSchema);



app.use(express.json()); 

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://to-do-brown-five.vercel.app"
  ]
};
app.use(cors(corsOptions));

app.get('/api/tasks', async (req, res) => {
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

app.post('/api/tasks', async (req, res) => {
  try {
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

app.delete('/api/tasks/:id', async (req, res) => {
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




app.put('/api/tasks/:id', async (req, res) => {
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


app.get("/", (req, res) => {
  res.send("Backend is running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
