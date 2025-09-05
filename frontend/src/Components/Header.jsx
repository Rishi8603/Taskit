import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-16 bg-zinc-900 border-b border-zinc-700 
      flex items-center justify-between px-6 z-50">
        <h1 className="text-white text-lg font-bold">Todo</h1>

        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full bg-zinc-900 border-b border-zinc-700 z-40">
          <nav className="flex flex-col px-6 py-4 gap-3">
            <Link
              to="/"
              className="text-white hover:text-gray-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/add"
              className="text-white hover:text-gray-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Add Task
            </Link>
            <Link
              to="/finished"
              className="text-white hover:text-gray-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Completed Task
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}

export default Header