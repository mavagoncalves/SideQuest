import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import CreateServicePage from './pages/CreateServicePage'
import LoginPage from './pages/LoginPage'
import ServiceDetail from './pages/ServiceDetail'

const App =() =>{

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/> 
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/service/create' element={<CreateServicePage/>}/>
        <Route path="/service/:id" element={<ServiceDetail />} />
        
      </Routes>
    </div>
  )
}

export default App
