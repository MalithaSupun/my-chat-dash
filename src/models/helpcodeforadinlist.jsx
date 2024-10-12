import React, { useState } from "react";
import { groups } from "../constants/groupsData"; // Groups data
import { users } from "../constants/usersData";  // Users (Analysts) data
import Chat from './Chat'; // Chat component

const ListItem = ({ item, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 border-b cursor-pointer ${
        isActive ? "bg-blue-100" : ""
      }`}
    >
      <div className="flex items-center space-x-4">
        {/* Item image (either group or user) */}
        <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full" />
        <div>
          {/* Item name and last message */}
          <p className="font-bold">{item.name}</p>
          <p className="text-sm text-gray-500">{item.message}</p>
        </div>
      </div>
      <div className="text-right">
        {/* Time */}
        <p className="text-sm text-gray-400">{item.time}</p>
        {/* Notification badge if unread messages */}
        {item.notification > 0 && (
          <span className="text-xs text-white bg-red-500 px-2 py-1 rounded-full">
            {item.notification}
          </span>
        )}
      </div>
    </div>
  );
};

const CombinedList = () => {
  // State for the active chat data
  const [activeChat, setActiveChat] = useState({ chatData: [], name: '', time: '' });

  // Function to handle clicking on a group
  const handleGroupClick = (group) => {
    setActiveChat({ chatData: group.chatData, name: group.name, time: group.time });
  };

  // Function to handle clicking on a user
  const handleUserClick = (user) => {
    setActiveChat({ chatData: user.chatData, name: user.name, time: user.time });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/3">
        {/* Section for Groups */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 border-t mt-3">
          <h2 className="text-lg font-bold pb-4">Groups</h2>
          <div>
            {groups.map((group) => (
              <ListItem
                key={group.groupId}
                item={group}
                isActive={activeChat.name === group.name}
                onClick={() => handleGroupClick(group)}
              />
            ))}
          </div>
        </div>

        {/* Section for Analysts */}
        <div className="bg-white p-4 rounded-lg shadow-md border-t mt-3">
          <h2 className="text-lg font-bold pb-4">Analysts</h2>
          <div>
            {users.map((user) => (
              <ListItem
                key={user.userId}
                item={user}
                isActive={activeChat.name === user.name}
                onClick={() => handleUserClick(user)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-2/3">
        {/* Pass the active chat data to the Chat component */}
        <Chat messages={activeChat.chatData} name={activeChat.name} time={activeChat.time} />
      </div>
    </div>
  );
};

export default CombinedList;
