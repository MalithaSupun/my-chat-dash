import { useState } from "react";
import { FaCheck, FaCheckDouble } from "react-icons/fa"; // Single and double check icons

const ListItem = ({ item, isActive, onClick }) => {
  // Helper function to render the appropriate icon based on status
  const renderStatusIcon = (status) => {
    switch (status) {
      case "read":
        return <FaCheckDouble className="text-green-500" />; // Read: green double checkmarks
      case "delivered":
      case "unread": // Combine delivered and unread
        return <FaCheckDouble className="text-black" />; // Delivered and unread: black double checkmarks
      case "not delivered":
        return <FaCheck className="text-black" />; // Not delivered: single black checkmark
      default:
        return null; // No icon if no status
    }
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 border-b cursor-pointer ${
        isActive ? "bg-blue-100" : ""
      }`}
    >
      <div className="flex items-center space-x-4">
        {/* Item image (either group or user) */}
        <img
          src={item.img}
          alt={item.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          {/* Item name and last message */}
          <p className="font-bold">{item.name}</p>
          <p className="text-sm text-gray-500">{item.message}</p>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-1">
        {/* Time */}
        <p className="text-sm text-gray-400">{item.time}</p>
        <div className="flex items-center space-x-2">
          {/* Render status icon based on the status */}
          {renderStatusIcon(item.status)}
          {/* Notification badge if unread messages */}
          {item.notification > 0 && (
            <span className="text-xs text-white bg-red-500 px-2 py-1 rounded-full">
              {item.notification}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminList = ({ activeId, setActiveId, activeType, setActiveType, users, groups }) => {  // Accept users and groups as props
  const handleGroupClick = (groupId) => {
    setActiveId(groupId);
    setActiveType("group");
    // Clear notification for the selected group
    const groupIndex = groups.findIndex((group) => group.groupId === groupId);
    if (groupIndex !== -1) {
      groups[groupIndex].notification = 0;
    }
  };

  const handleUserClick = (userId) => {
    setActiveId(userId);
    setActiveType("user");
    // Clear notification for the selected user
    const userIndex = users.findIndex((user) => user.userId === userId);
    if (userIndex !== -1) {
      users[userIndex].notification = 0;
    }
  };

  // Ensure all users with chat data are included
  const usersWithChatData = users
    .filter((user) => user.chatData && user.chatData.length > 0)
    .map((user) => {
      const lastChat = user.chatData[user.chatData.length - 1]; // Get the last message in chatData
      return {
        ...user,
        message: lastChat.message, // Use the last chat message
      };
    });

  // Ensure all groups are included, even those without chat data
  const groupsWithFallbackChatData = groups.map((group) => {
    const lastChat = group.chatData?.[group.chatData.length - 1] || {}; // Fallback to an empty object if no chat data
    return {
      ...group,
      message: lastChat.message || "No messages yet", // Fallback to a default message
    };
  });

  return (
    <>
      {/* Section for Groups */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 border-t mt-3">
        <h2 className="text-lg font-bold pb-4">Groups</h2>
        <div>
          {groupsWithFallbackChatData.map((group) => (
            <ListItem
              key={group.groupId}
              item={group}
              isActive={activeType === "group" && activeId === group.groupId}
              onClick={() => handleGroupClick(group.groupId)}
            />
          ))}
        </div>
      </div>
      {/* Section for Analysts */}
      <div className="bg-white p-4 rounded-lg shadow-md border-t mt-3">
        <h2 className="text-lg font-bold pb-4">Analysts</h2>
        <div>
          {usersWithChatData.map((user) => (
            <ListItem
              key={user.userId}
              item={user}
              isActive={activeType === "user" && activeId === user.userId}
              onClick={() => handleUserClick(user.userId)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminList;
