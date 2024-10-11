// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidemenu from '../components/Sidemenu';
import Header from '../components/Header';

const Dashboard = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Example threshold for small screens

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Update state based on window size
    };

    window.addEventListener('resize', handleResize); // Add event listener
    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="flex h-screen">
      <Sidemenu />
      <div className="flex-1 flex flex-col h-full bg-gray-100">
        <Header />
        <div className={`p-4 flex-1 bg-white h-full ${isSmallScreen ? 'overflow-hidden' : 'overflow-auto'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
