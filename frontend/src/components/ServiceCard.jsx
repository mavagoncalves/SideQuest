import React from 'react'

const ServiceCard = () => {
  return (
    <div className="border border-gray-200 rounded-xl p-4">
      {/* a visual placeholder, can insert image or icon */}
      <div className="w-full h-40 bg-gray-100 rounded-lg mb-3" />
      
      {/* Service information */}
      <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" /> {/* Title */}
      <div className="h-4 w-1/2 bg-gray-100 rounded mb-4" /> {/* price and user */}

      {/* View detail hint */}
      <div className="text-orange-600 text-sm font-bold hover:bg-gray-100 transition-shadow cursor-pointer">View Details →</div>
    </div>
  )
}

export default ServiceCard