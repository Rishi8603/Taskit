import React, { useContext } from "react";
import TaskList from "../tasks/TaskList.jsx";
import { Outlet } from "react-router-dom";
import TasksContext from "../context/TasksContext.jsx";

function Layout() {
  const {
    tasks,
    setTasks,
    deleteTask,
    updateTask,
    editingId,
    setEditingId,
    editingText,
    setEditingText,
    loading, 
  } = useContext(TasksContext);
  console.log("Tasks from context:", tasks);
  console.log("Loading flag:", loading);

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
