import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function TaskList({ tasks, deleteTask, updateTask, editingId, setEditingId, editingText, setEditingText }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="mt-16 p-4 bg-[#27272a] 
    w-full min-h-[calc(100vh-4rem)]
    lg:ml-60 lg:w-[calc(100%-15rem)]
    border-t border-zinc-700 lg:border-l"
    >
      <ul className="flex flex-col gap-3">
        {tasks.map((task) => {
          if (task.completed) return null;

          return (
            <div key={task.id} className="flex items-center justify-between mb-2 bg-zinc-600 p-1 rounded">

              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {
                  const updatedTask = { ...task, completed: !task.completed };
                  updateTask(task.id, updatedTask); 
                }}
                className="mr-2 accent-green-500"
              />

              {editingId === task.id ? (
          
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-1 text-white bg-zinc-700 px-2 py-1 rounded"
                />
              ) : (
  
                <span className="flex-1 text-white truncate">
                  {task.text}
                </span>
              )}

              <div className="flex items-center">

                {editingId === task.id ? (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm ml-2"
                    onClick={async () => {
                      const updatedTask = { ...task, text: editingText };
                      await updateTask(task.id, updatedTask); 
                      setEditingId(null); 
                    }}
                  >
                    💾
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm ml-2"
                    onClick={() => {
                      setEditingId(task.id);
                      setEditingText(task.text);
                    }}
                  >
                    ✏️
                  </button>
                )}

                <button
                  className={`bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm ml-2 ${editingId !== null ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => {
                    if (editingId !== null) return;
                    deleteTask(task.id); 
                  }}
                  disabled={editingId !== null}
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}
      </ul>

      {location.pathname !== "/add" && (
        <button
          onClick={() => navigate("/add")}
          className="fixed bottom-6 right-6 p-4 bg-gray-700 rounded-2xl text-white text-2xl shadow-lg"
        >
          ➕
        </button>
      )}
    </div>
  )
}

export default TaskList;