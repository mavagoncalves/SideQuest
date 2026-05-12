import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { User} from 'lucide-react';
import BackButton from '../components/BackButton';

const ServiceDetail = () => {
  const { id } = useParams();

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
              Service Title
            </h1>
            
            <div className="flex items-center mt-4 text-2xl font-bold text-gray-900">
              <span>250 SEK</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl mb-8">
            <h2 className="font-bold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui beatae itaque aliquid 
              repudiandae illo possimus molestias corporis eveniet amet autem, iste placeat dolore 
              non libero praesentium alias dignissimos incidunt.
            </p>
          </div>

          <div className="flex items-center p-4 border border-gray-200 rounded-xl mb-8">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mr-4">
              <User size={24} />
            </div>
            <div>
              <Link 
                to="/profile/placeholder-user-id" 
                className="font-bold text-gray-900 hover:text-orange-600 transition-colors"
              >
                Student Name
              </Link>
            </div>
          </div>

          <button 
            type="button"
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 shadow-lg shadow-gray-200"
          >
            Hire
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServiceDetail;