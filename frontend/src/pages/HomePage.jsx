import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ServiceCard from '../components/ServiceCard'
import SearchBar from '../components/SearchBar';
import axiosClient from '../api/axiosClient';

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const url = searchQuery ? `/marketplace?term=${searchQuery}` : '/marketplace';  
        const response = await axiosClient.get(url);

        setServices(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
        setServices([]); // keeping empty if backend is down 
      } finally {
        setLoading(false);
      }
    };

    // wait for user to stop typing (Debounce)
    const timer = setTimeout(() => {
      fetchServices();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-10">

          {/* SearchBar here */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black mb-6">Find Providers Services</h1>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* ServiceCard here (grid) */}
          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.length > 0 ? (
                services.map((user) => (
                  <ServiceCard 
                    key={user.id} 
                    id={user.id}
                    title={user.skills?.[0]?.skill?.name}
                    price={0}
                    providerName={`${user.firstName} ${user.lastName}`}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-400 italic">
                  {searchQuery ? `No results for "${searchQuery}"` : "No services available right now."}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer/>
      
    </div>
  )
}

export default HomePage