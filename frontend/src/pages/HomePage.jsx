import React from 'react'
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
        //ROBERTO tal vez esto lo necesites o te interese para el backend (lo del url)
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