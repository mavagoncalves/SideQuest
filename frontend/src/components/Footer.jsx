import React from 'react'
import { useState } from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-orange-200 mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3">

          {/* design, not a link yet for contact page*/}
          <p className="text-gray-700 font-medium hover:text-orange-600 cursor-pointer transition-colors"> 
            Contact us 
          </p>

          <p className="text-gray-600">
            © 2026 <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent font-black">SideQuest</span>. All rights reserved.
          </p>

          <div className="pt-2">
            <a 
              href="https://github.com/mavagoncalves/SideQuest" 
              target="_blank" 
              rel="noreferrer"  //prevents the new website from seeing where the user came from
              className="text-gray-400 hover:text-gray-900 text-sm transition-colors"
            >
              View on GitHub
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer