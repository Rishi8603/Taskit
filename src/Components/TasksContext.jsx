import { createContext, useEffect,useState } from "react";
const TasksContext=createContext();


export function TasksProvider({children}){
  // 1. Initialize tasks as an empty array
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // 2. Fetch tasks from the backend when the app loads
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data); // Update state with data from the server
      })
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []); // The empty array [] means this effect runs only once

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  // In TasksContext.jsx

  async function addTask(newTaskText) {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTaskText }), // Send the text in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to add task on server");
      }

      const addedTask = await response.json(); // The new task, as confirmed by the server
      setTasks([...tasks, addedTask]); // Update the local state

    } catch (err) {
      console.error("Error adding task:", err);
    }
  }

  async function deleteTask(id) {
    try {
      // Use a template literal to include the id in the URL
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task on server");
      }

      // If the server deletion was successful, update the frontend state
      setTasks(tasks.filter((_, i) => i !== index));

    } catch (err) {
      console.error("Error deleting task:", err);
    }
  }

  async function updateTask(id, updatedTaskData) {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskData),
      });

      if (!response.ok) {
        throw new Error("Failed to update task on server");
      }

      const returnedTask = await response.json();
      // Update the local state by mapping over the old tasks
      const newTasks = tasks.map((task) =>
        task.id === id ? returnedTask : task
      );
      setTasks(newTasks);

    } catch (err) {
      console.error("Error updating task:", err);
    }
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        deleteTask,
        updateTask,
        editingId,
        setEditingId,
        editingText,
        setEditingText
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}



export default TasksContext;