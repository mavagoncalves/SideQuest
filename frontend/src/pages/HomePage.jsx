import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import apiClient from '../api/axiosClient';

import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import StudentCard from '../components/StudentCard' 
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const url = searchQuery ? `/marketplace?term=${searchQuery}` : '/marketplace';  
        const response = await apiClient.get(url);
        setStudents(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
        setStudents([]); // keeping empty if backend is down 
      } finally {
        setLoading(false);
      }
    };

    // wait for user to stop typing (Debounce)
    const timer = setTimeout(() => {
      fetchStudents();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-[#fff7f4] font-sans text-slate-900 flex flex-col">
      <Navbar />

      {/* Welcome part */}
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-10 text-center text-white">
        <h2 className="m-0 text-4xl font-extrabold text-white">
          Find Available Students with Skills
        </h2>
        <p className="mt-3 text-white">
          Connect with student freelancers ready to help.
        </p>
      </section>

      {/* Main Container */}
      <section className="max-w-6xl mx-auto my-9 px-5 w-full flex-grow">
        
        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-orange-100 pb-4">
          <div>
            <h3 className="m-0 text-2xl font-bold">
              {searchQuery ? "Search Results" : "Available Talent"}
            </h3>
            {searchQuery && (
              <p className="mt-1 text-sm text-slate-500 flex items-center gap-1.5">
                <Search size={14} /> Showing cards matching <span className="font-extrabold text-orange-600">"{searchQuery}"</span>
              </p>
            )}
          </div>
          <div className="text-sm font-bold text-slate-500 bg-white border border-orange-100 px-3 py-1 rounded-full">
            Found {students.length} profile{students.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Dynamic content */}
        {loading ? (
          <p className="text-center text-slate-500 italic py-20">Loading student profiles...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.length > 0 ? (
              students.map((user) => (
                <StudentCard 
                  key={user.id} 
                  id={user.id}
                  name={`${user.firstName} ${user.lastName}`}
                  skills={user.skills}
                  location={user.location}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20 rounded-xl border border-orange-200 bg-white text-slate-400 italic">
                {searchQuery ? `No students found matching "${searchQuery}"` : "No student talent available right now."}
              </div>
            )}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

export default HomePage;