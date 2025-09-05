import { createContext, useEffect, useState } from "react";
const TasksContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetch(`${backendUrl}/api/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  async function addTask(newTaskText) {
    try {
      const response = await fetch(`${backendUrl}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTaskText }),
      });

      if (!response.ok) throw new Error("Failed to add task on server");

      const addedTask = await response.json();
      setTasks([...tasks, addedTask]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`${backendUrl}/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task on server");

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  }

  async function updateTask(id, updatedTaskData) {
    try {
      const response = await fetch(`${backendUrl}/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTaskData),
      });

      if (!response.ok) throw new Error("Failed to update task on server");

      const returnedTask = await response.json();
      setTasks(tasks.map((task) => (task.id === id ? returnedTask : task)));
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
        setEditingText,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export default TasksContext;
