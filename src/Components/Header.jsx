import React from 'react'

function Header() {
  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-zinc-900 border-b border-zinc-700 
    flex items-center justify-between px-6">

      <h1 className="text-white text-lg font-bold">Todo</h1>

      <div className="flex items-center gap-4">
        <button className="text-white">Login</button>
        <button className="bg-gray-800 text-white px-3 py-1 rounded">Sign Up</button>
      </div>
    </div>

  )
}

export default Header