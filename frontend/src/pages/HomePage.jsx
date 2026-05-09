import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-10">
        </div>
      </main>
      <Footer/>
      
    </div>
  )
}

export default HomePage