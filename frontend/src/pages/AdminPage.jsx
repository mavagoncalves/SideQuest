import React from 'react'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'

const AdminPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BackButton />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-10">
        </div>
      </main>
      
      <Footer/>
    </div>
  )
}

export default AdminPage