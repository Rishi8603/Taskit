import React from 'react'
import { Link } from 'react-router-dom'

function SidebarLeft() {
  return (
    <div className="hidden lg:block fixed top-16 left-0 w-60 h-[calc(100vh-4rem)] bg-zinc-900 border-r border-zinc-700 p-4 text-white">
      <h1 className="text-lg font-bold mb-6">My Tasks</h1>
      <nav className="flex flex-col gap-3">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/add" className="hover:text-gray-300">Add Task</Link>
        <Link to="/finished" className="hover:text-gray-300">Completed Task</Link>
      </nav>

      
    </div>
  )
}

export default SidebarLeft
