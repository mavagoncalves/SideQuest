import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import StudentCard from '../components/StudentCard' 
import SearchBar from '../components/SearchBar';
import apiClient from '../api/axiosClient';

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
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-10">

          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black mb-6">Find Available Student with Skills</h1>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {loading ? (
            <p className="text-center text-gray-400">Loading student profiles...</p>
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
                <div className="col-span-full text-center py-20 text-gray-400 italic">
                  {searchQuery ? `No students found matching "${searchQuery}"` : "No student talent available right now."}
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

export default HomePage;