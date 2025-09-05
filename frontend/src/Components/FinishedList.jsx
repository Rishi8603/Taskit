import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import TasksContext from './TasksContext.jsx';

function FinishedList() {

  const { tasks, deleteTask, updateTask } = useContext(TasksContext);
  const navigate = useNavigate();

  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="mt-16 p-4 bg-[#27272a] 
    w-full min-h-[calc(100vh-4rem)]
    lg:ml-60 lg:w-[calc(100%-15rem)]
    border-t border-zinc-700 lg:border-l
    absolute top-0 left-0 z-10"
    >

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Completed Tasks</h2>
        <p className="text-zinc-400">
          {completedTasks.length} completed task{completedTasks.length !== 1 ? 's' : ''}
        </p>
      </div>

      {completedTasks.length === 0 ? (
        <div className="text-center text-zinc-500 mt-20">
          <p className="text-xl">No completed tasks yet</p>
          <p className="mt-2">Complete some tasks to see them here!</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {tasks.map((task) => {
            if (!task.completed) return null;

            return (
              <div key={task.id} className="flex items-center justify-between mb-2 bg-zinc-600 p-3 rounded-lg">
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => {
                    const updatedTask = { ...task, completed: false };
                    updateTask(task.id, updatedTask); 
                  }}
                  className="mr-3 accent-green-500"
                  title="Click to mark as incomplete"
                />
                <span className="flex-1 text-white truncate line-through opacity-75">
                  {task.text}
                </span>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm ml-2"
                  onClick={() => deleteTask(task.id)} 
                  title="Delete task"
                >
                  🗑️
                </button>
              </div>
            );
          })}
        </ul>
      )}

      <button
        onClick={() => navigate("/")}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white text-2xl shadow-lg"
        title="Back to Tasks"
      >
        📋
      </button>
    </div>
  );
}

export default FinishedList;