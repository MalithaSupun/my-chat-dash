import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTasks, FaUsers, FaComments, FaQuestionCircle } from 'react-icons/fa';

const Sidemenu = () => {
  return (
    <div className="w-64 h-screen bg-white-800 text-black flex flex-col justify-between border-r border-gray-300">
      {/* Top section */}
      <div className="p-4">
        <div className="flex items-center mb-8">
          <div className="bg-red-400 w-10 h-10 rounded-full mr-3"></div>
          <span className="font-semibold text-lg">NorthLark Wren</span>
        </div>

        {/* Menu items */}
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/analysist-task"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center bg-gray-200 cursor-pointer rounded-md p-2"
                  : "flex items-center cursor-pointer rounded-md p-2 hover:bg-gray-100 hover:opacity-95"
              }
            >
              <FaTasks className="mr-3" />
              <span>Analyst Tasks</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-tasks"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center bg-gray-200 cursor-pointer rounded-md p-2"
                  : "flex items-center cursor-pointer rounded-md p-2 hover:bg-gray-100"
              }
            >
              <FaUsers className="mr-3" />
              <span>Admin Tasks</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/wren-connect"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center bg-gray-200 cursor-pointer rounded-md p-2"
                  : "flex items-center cursor-pointer rounded-md p-2 hover:bg-gray-100"
              }
            >
              <FaComments className="mr-3" />
              <span>WrenConnect</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Bottom section */}
      <div className="p-4">
        <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded-md p-2">
          <FaQuestionCircle className="mr-3" />
          <span>Help and Support</span>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
