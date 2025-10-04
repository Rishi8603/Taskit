import React, { useState, useEffect } from "react";
import TaskList from "../tasks/TaskList.jsx";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import TasksContext from "../context/TasksContext.jsx";

function Layout() {
  const {tasks,setTasks,deleteTask,updateTask,editingId,setEditingId,editingText,setEditingText}=useContext(TasksContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait until tasks are fetched from context (DB)
    if (tasks && tasks.length > 0) {
      setLoading(false);
    } else {
      // small delay to handle empty or slow loading
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [tasks]);
  
  return (
    <div>
      {loading ? (
        <p
          style={{
            textAlign: "center",
            color: "gray",
            fontStyle: "italic",
            marginTop: "20px",
          }}
        >
          🕓 Connecting to server... please wait a few seconds
        </p>
      ) : (
        <>
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
            editingId={editingId}
            setEditingId={setEditingId}
            editingText={editingText}
            setEditingText={setEditingText}
          />
          <Outlet />
        </>
      )}
    </div>
  );
}

export default Layout;
