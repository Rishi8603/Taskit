const express=require('express')
const cors=require('cors')
const app = express()
const {v4: uuidv4}=require('uuid');

app.use(express.json()); 

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://to-do-brown-five.vercel.app"
  ]
};
app.use(cors(corsOptions));

let tasks =[
  {id:uuidv4(), text: "learn about express",completed:false},
  {id: uuidv4(), text: "create a GET route", completed:false},
  {id: uuidv4(), text: "connect react to express", completed:false}
];

app.get('/api/tasks', (req,res)=>{
  res.json(tasks);
})

app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: uuidv4(),
    text: req.body.text, 
    completed: false    
  };
  tasks.push(newTask);
  console.log('Task added:', newTask); 
  res.status(201).json(newTask);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ message: "Task deleted successfully" });
});


app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.json(tasks[taskIndex]);
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
