const express=require('express')
const cors=require('cors')
const app = express()
const {v4: uuidv4}=require('uuid');

app.use(express.json()); 

app.use(cors())

const tasks =[
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

app.listen(5000, () => {
  console.log("http://localhost:5000/api/tasks");
});