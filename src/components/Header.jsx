import React, { useState } from 'react';
import { FaChevronDown, FaCog, FaSignOutAlt } from 'react-icons/fa';
import NotificationDropdown from './NotificationDropdown';  // Import the chat notification component

const Header = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="flex justify-end items-center h-16 bg-white shadow px-4 border-b border-gray-300">
      
      {/* Right side: Notification and Profile */}
      <div className="flex items-center space-x-6">

        {/* Notification Dropdown */}
        <NotificationDropdown />  {/* Chat Notification dropdown */}

        {/* Profile Section */}
        <div className="relative dropdown">
          <div
            className="flex items-center space-x-2 bg-purple-100 p-1 rounded-full cursor-pointer"
            onClick={toggleProfileDropdown}
          >
            <img
              src="https://randomuser.me/api/portraits/women/75.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <FaChevronDown className="text-gray-600" />
          </div>

          {/* Profile Dropdown */}
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
              <ul className="p-2">
                <li className="flex items-center p-2 text-gray-600 hover:bg-gray-100 cursor-pointer">
                  <FaCog className="mr-2" />
                  Settings
                </li>
                <li className="flex items-center p-2 text-gray-600 hover:bg-gray-100 cursor-pointer">
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
