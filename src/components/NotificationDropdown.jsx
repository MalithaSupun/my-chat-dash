import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { users, groups } from '../constants/usersData'; // Import users and groups data
import { CSSTransition } from 'react-transition-group';
import './NotificationDropdown.css'; // Add necessary CSS for animations

const NotificationDropdown = () => {
  const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false);

  // Merge users and groups notifications into one array and filter those with notifications > 0
  const notifications = [...users, ...groups].filter(item => item.notification > 0);

  const toggleNotificationDropdown = () => {
    setNotificationDropdownOpen(!isNotificationDropdownOpen);
  };

  const clearNotifications = () => {
    // Clear notifications for both users and groups
    users.forEach(user => (user.notification = 0));
    groups.forEach(group => (group.notification = 0));

    // Close dropdown after clearing notifications
    setNotificationDropdownOpen(false);
  };

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.dropdown')) {
        setNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative dropdown">
      <FaBell className="text-gray-600 text-xl cursor-pointer" onClick={toggleNotificationDropdown} />
      
      {/* Notification Badge */}
      {notifications.length > 0 && (
        <span className="absolute top-0 left-4 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {notifications.length}
        </span>
      )}

      {/* Notification Dropdown with animation */}
      <CSSTransition
        in={isNotificationDropdownOpen}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md z-10 fade">
          <div className="p-2 border-b">
            <h4 className="font-semibold text-gray-700">Chat Notifications</h4>
          </div>
          <ul className="p-2 overflow-y-auto max-h-72">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification.userId || notification.groupId} className="flex items-center p-2 border-b hover:bg-gray-100">
                  <img
                    src={notification.img}
                    alt={notification.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800">{notification.name}</span>
                  </div>
                  {notification.notification > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notification.notification}
                    </span>
                  )}
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
      </CSSTransition>
    </div>
  );
};

export default NotificationDropdown;
