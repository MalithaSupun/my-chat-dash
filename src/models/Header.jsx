import React, { useState, useEffect } from 'react';
import { FaBell, FaChevronDown, FaCog, FaSignOutAlt } from 'react-icons/fa';

const TopNavigation = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(['Notification 1', 'Notification 2', 'Notification 3']);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleNotificationDropdown = () => {
    setNotificationDropdownOpen(!isNotificationDropdownOpen);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the dropdown elements
      if (!event.target.closest('.dropdown')) {
        setProfileDropdownOpen(false);
        setNotificationDropdownOpen(false);
      }
    };

    // Add event listener to the document
    document.addEventListener('click', handleOutsideClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex justify-end items-center h-16 bg-white shadow px-4 border-b border-gray-300">
      
      {/* Right side: Notification and Profile */}
      <div className="flex items-center space-x-6">

        {/* Notification Icon with Badge */}
        <div className="relative dropdown">
          <FaBell className="text-gray-600 text-xl cursor-pointer" onClick={toggleNotificationDropdown} />
          {notifications.length > 0 && (
            <span className="absolute top-0 left-4 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notifications.length}
            </span>
          )}

          {/* Notification Dropdown */}
          {isNotificationDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-10">
              <div className="p-2 border-b">
                <h4 className="font-semibold text-gray-700">Recent Notifications</h4>
              </div>
              <ul className="p-2">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li key={index} className="text-gray-600 p-2 border-b">
                      {notification}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600 p-2">No new notifications</li>
                )}
              </ul>
              {notifications.length > 0 && (
                <div className="p-2 border-t">
                  <button
                    className="text-red-500 text-sm w-full text-left"
                    onClick={clearNotifications}
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

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

export default TopNavigation;