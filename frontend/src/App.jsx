import React, { useState } from 'react'
import { TasksProvider } from './Components/TasksContext.jsx'; import SidebarLeft from './Components/SidebarLeft.jsx'
//import SidebarRight from './Components/SidebarRight.jsx'
import Header from './Components/Header.jsx'
import Card from './Components/Card.jsx'
import Layout from './Components/Layout.jsx'
import FinishedList from './Components/FinishedList.jsx'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <TasksProvider>
        <Header></Header>
        <SidebarLeft></SidebarLeft>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={null}/>{/*by this we set tasklist to background*/}
            <Route path="add" element={<Card />} />
            <Route path="finished" element={<FinishedList />} />
          </Route>
        </Routes>
        </TasksProvider>
    </BrowserRouter>
  )
}

export default App
