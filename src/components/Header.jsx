import React from 'react';
import { FaBell, FaChevronDown } from 'react-icons/fa';

const TopNavigation = () => {
  return (
    <div className="flex justify-end items-center h-16 bg-white shadow px-4 border-b border-gray-300">
    
      {/* Right side: Notification and Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon with Badge */}
        <div className="relative">
          <FaBell className="text-gray-600 text-xl cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-2 bg-purple-100 p-1 rounded-full cursor-pointer">
          <img
            src="https://randomuser.me/api/portraits/women/75.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <FaChevronDown className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
