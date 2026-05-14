import React from 'react'
import { Link } from 'react-router-dom';

const ServiceCard = ({ id, title, price, providerName }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4">
      {/* a visual placeholder, can insert image or icon */}
      <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400" > 
        <div className="text-center">
          <p>Image</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
        {providerName || "Provider"}
      </p>

      <h3 className="font-bold">{title || "Title of the service"}</h3>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xl font-black text-gray-900">
          ${price || "0.00"}
        </span>
      
        <Link 
          to={`/service/${id}`} 
          className="inline-block mt-4 text-orange-600 font-bold hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}

export default ServiceCard