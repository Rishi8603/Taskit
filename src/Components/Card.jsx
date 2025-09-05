import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import TasksContext from './TasksContext.jsx';

function Card() {
  const navigate = useNavigate();
  const { addTask } = useContext(TasksContext);
  const [text, setText] = useState('');

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center lg:items-center lg:justify-center"
      onClick={() => navigate("/")}
    >
      <div
        className="bg-white rounded-t-xl lg:rounded-xl p-6 w-full lg:w-80 shadow-lg
        max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-black">Add Task</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!text.trim()) return;

            await addTask(text);
            navigate("/");
          }}
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Task title"
            className="w-full border p-3 rounded mb-4 text-black"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Card