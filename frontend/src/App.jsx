import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import CreateServicePage from './pages/CreateServicePage'

const App =() =>{

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/> 
        {/* not actual path, just placeholder */}
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/service/create' element={<CreateServicePage/>}/>
        
      </Routes>
    </div>
  )
}

export default App
