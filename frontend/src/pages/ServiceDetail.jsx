import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User } from 'lucide-react';
import BackButton from '../components/BackButton';
import axiosClient from '../api/axiosClient';

const ServiceDetail = () => {
  const { id } = useParams();
  const [talent, setTalent] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // This hits the router.get('/:id', getMarketPlaceUserById)
        const response = await axiosClient.get(`/marketplace/${id}`);
        setTalent(response.data);
      } catch (error) {
        console.error("Error connecting to marketplace controller", error);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  if (!talent) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">

      <div className="mb-8">
        <BackButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* image */}
        <div className="aspect-video lg:aspect-square bg-gray-100 rounded-2xl border-2 border-gray-300 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p>Image</p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-sm font-bold text-orange-600 uppercase">Service Details</span>
            <h1 className="text-4xl font-black text-gray-900 mt-2">
              {talent.skills?.[0]?.skill?.name || "Service"}
            </h1>
            
            <div className="flex items-center mt-4 text-2xl font-bold text-gray-900">
              <span>Price on request</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl mb-8">
            <h2 className="font-bold text-gray-800 mb-2">Description</h2>
            <div className="flex flex-wrap gap-2">
              {talent.skills?.map((s, i) => (
                <span key={i} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                  {s.skill.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center p-4 border border-gray-200 rounded-xl mb-8">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mr-4">
              <User size={24} />
            </div>
            <div>
              <Link 
                to="{`/profile/${talent.id}`}" 
                className="font-bold text-gray-900 hover:text-orange-600 transition-colors"
              >
                {talent.firstName} {talent.lastName}
              </Link>
            </div>
          </div>

          <button 
            type="button"
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 shadow-lg shadow-gray-200"
          >
            Hire {talent.firstName}
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServiceDetail;