import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BriefcaseBusiness, User, ShieldCheck, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Check if there is a user stored in the browser
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  // Handle wiping the session and redirecting
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="bg-white/80 border-b-2 border-orange-200 sticky top-0 z-40 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* LOGO (Untouched from your design) */}
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
            
            {/* Always visible links */}

            {/* I commented out the link for admin, before it was just as a template idea, but idk what is gonna be done with it */}
            
            {/* <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-orange-600 font-bold text-sm transition-colors"
            >
              <ShieldCheck size={18} />
              <span className="hidden md:inline">Admin</span>
            </Link> */}

            {/* Smart Authentication Divider */}
            <div className="h-6 w-px bg-orange-200 mx-2 hidden sm:block"></div>

            {user ? (
              // IF LOGGED IN
              <>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 px-4 py-2 text-orange-600 hover:bg-orange-50 font-bold text-sm rounded-full transition-colors border border-transparent hover:border-orange-200"
                >
                  <User size={18} />
                  <span className="hidden md:inline">{user.firstName || 'Profile'}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              // IF NOT LOGGED IN
              <>
                <Link 
                  to="/login" 
                  className="hidden md:block text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors px-4 py-2"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="hidden sm:block rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;