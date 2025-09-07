import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { TasksProvider } from './Components/context/TasksContext.jsx';
import SidebarLeft from './Components/layout/SidebarLeft.jsx'
import Header from './Components/ui/Header.jsx'
import Card from './Components/ui/Card.jsx'
import Layout from './Components/layout/Layout.jsx'
import FinishedList from './Components/tasks/FinishedList.jsx'


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
