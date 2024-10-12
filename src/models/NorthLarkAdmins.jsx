import React from "react";
import { users } from "../constants/usersData";

const GroupItem = ({ user }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        {/* User avatar */}
        <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full" />
        <div>
          {/* User name and message */}
          <p className="font-bold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.message}</p>
        </div>
      </div>
      <div className="text-right">
        {/* Time */}
        <p className="text-sm text-gray-400">{user.time}</p>
        {/* Checkmark icon if read */}
        {user.status === "read" && (
          <span className="text-green-500">&#10004;&#10004;</span>
        )}
        {/* Notification badge if unread messages */}
        {user.notification > 0 && (
          <span className="text-xs text-white bg-red-500 px-2 py-1 rounded-full">
            {user.notification}
          </span>
        )}
      </div>
    </div>
  );
};

const GroupsList = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-4 border-t mt-5">
      <h2 className="text-lg font-bold pb-4">NorthLark Admins</h2>
      <div>
        {users.map((user) => (
          <GroupItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default GroupsList;
