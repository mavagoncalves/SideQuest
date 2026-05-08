import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';

const BackButton = () => {
  return (
    <div>
        <Link to={"/"} 
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50"
        >
            <ArrowLeftIcon  size={16}/>
            Back
        </Link>
    </div>
  )
}

export default BackButton