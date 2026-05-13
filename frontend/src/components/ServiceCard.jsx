import React from 'react'
import { Link } from 'react-router-dom';

const ServiceCard = ({ id, title }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4">
      {/* a visual placeholder, can insert image or icon */}
      <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400" > 
        <div className="text-center">
          <p>Image</p>
        </div>
      </div>
      <h3 className="font-bold">{title || "Title of the service"}</h3>
      
      <Link 
        to={`/service/${id}`} 
        className="inline-block mt-4 text-orange-600 font-bold hover:underline"
      >
        View Details →
      </Link>
    </div>
  )
}

export default ServiceCard