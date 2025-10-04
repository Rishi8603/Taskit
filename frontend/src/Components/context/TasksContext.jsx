import { createContext, useEffect, useState } from "react";
const TasksContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(`${backendUrl}/api/tasks`);
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
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
