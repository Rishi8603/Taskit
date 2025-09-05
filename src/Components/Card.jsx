import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react';
import TasksContext from './TasksContext.jsx';

function Card() {
  const navigate = useNavigate();
  const { addTask } = useContext(TasksContext);
  const [text, setText] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    // Detect keyboard on mobile only
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        const viewportHeight = window.visualViewport?.height || window.innerHeight;
        const windowHeight = window.screen.height;
        const heightDifference = windowHeight - viewportHeight;
        setIsKeyboardOpen(heightDifference > 150);
      } else {
        setIsKeyboardOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={() => navigate("/")}
    >
      <div
        className="absolute bottom-6 right-6 bg-white rounded-xl p-6 w-80 shadow-lg"
        style={
          window.innerWidth < 1024 && isKeyboardOpen ? {
            top: '20px',
            bottom: 'auto',
            left: '20px',
            right: '20px',
            width: 'auto'
          } : {}
        }
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
            className="w-full border p-2 rounded mb-4 text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default Card