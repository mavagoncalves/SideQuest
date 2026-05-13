import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ServiceCard from '../components/ServiceCard'

const HomePage = () => {
  const dummyPosts = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyPosts.map((post) => (
              <ServiceCard key={post} />
            ))}
          </div>
        </div>
      </main>
      <Footer/>
      
    </div>
  )
}

export default HomePage