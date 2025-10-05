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
    loading, // ✅ get loading from context
  } = useContext(TasksContext);

  if (loading) {
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "2rem",
          color: "gray",
          fontStyle: "italic",
        }}
      >
        ⏳ Wait, DB is loading...
      </p>
    );
  }

  return (
    <div>
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
    </div>
  );
}

export default Layout;
