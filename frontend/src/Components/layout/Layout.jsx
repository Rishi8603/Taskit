import React, { useState, useEffect } from "react";
import TaskList from "../tasks/TaskList.jsx";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import TasksContext from "../context/TasksContext.jsx";

function Layout() {
  const {tasks,setTasks,deleteTask,updateTask,editingId,setEditingId,editingText,setEditingText}=useContext(TasksContext);
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
      <Outlet/>
    </div>
  );
}

export default Layout;
