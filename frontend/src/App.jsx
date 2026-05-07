import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'

const App =() =>{

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/> 
        {/* not actual path, just placeholder */}
        <Route path='/admin' element={<AdminPage/>}/> 
      </Routes>
    </div>
  )
}

export default App
