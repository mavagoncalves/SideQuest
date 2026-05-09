import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, User, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white/80 border-b-2 border-orange-200 sticky top-0 z-40 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">

            <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-2 rounded-xl shadow-md">
              <BriefcaseBusiness className="w-6 h-6 text-white" />
            </div>

            <h1 className="text-xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent hidden sm:block">
              SideQuest
            </h1>

          </Link>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-orange-600 font-bold text-sm transition-colors"
            >
              <ShieldCheck size={18} />
              <span className="hidden md:inline">Admin</span>
            </Link>
            
            <Link 
              to="/service/create"
              className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full hover:shadow-lg hover:shadow-orange-300/50 transition-all font-bold text-sm flex items-center gap-2"
            >
              <User size={18} />
              <span className="hidden sm:inline">Post Service</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;