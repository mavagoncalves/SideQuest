import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import CreateServicePage from './pages/CreateServicePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'

const App =() =>{

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/> 
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/service/create' element={<CreateServicePage/>}/>

        {/* Only logged in users can access these */}
        <Route 
          path='/admin'
          element={
            <ProtectedRoute>
              <AdminPage/>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/profile'
          element={
            <ProtectedRoute>
              <ProfilePage/>
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  )
}

export default App
