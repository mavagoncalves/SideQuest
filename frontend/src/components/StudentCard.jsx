import React from 'react'
import { Link } from 'react-router-dom';

const StudentCard = ({ id, name, skills, location}) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4">
      <div>
        {/* avatar */}
        <div className="w-full h-40 bg-orange-50 rounded-xl mb-4 flex items-center justify-center text-orange-400 border border-orange-100"> 
          <User size={48} />
        </div>
        
        {/* name of student */}
        <h3 className="text-xl font-black text-gray-900 mb-1">{name}</h3>
        
        {/* Location if available */}
        {location && (
          <p className="text-xs text-gray-400 mb-3">{location}</p>
        )}

        {/* Dynamic skill  */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {skills && skills.length > 0 ? (
            skills.slice(0, 3).map((s, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                {s.skill?.name}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400 italic">No skills listed</span>
          )}
          {skills?.length > 3 && (
            <span className="text-xs text-gray-400 self-center font-bold pl-1">
              +{skills.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-5 pt-3 border-t border-gray-50 flex items-center justify-between">
          <Link 
            to={`/profile/${id}`} 
            className="text-orange-600 font-bold text-sm hover:text-orange-700 transition-colors"
          >
            View Profile →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StudentCard