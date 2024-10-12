import React from "react";
import { groups } from "../constants/groupsData"; // Your groups data
import { users } from "../constants/usersData";  // Your users (Analysts) data

const ListItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
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
        {/* Checkmark icon if read */}
        {item.status === "read" && (
          <span className="text-green-500">&#10004;&#10004;</span>
        )}
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
  return (
    <>
      {/* Section for Groups */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 border-t mt-3">
        <h2 className="text-lg font-bold pb-4">Groups</h2>
        <div>
          {groups.map((group) => (
            <ListItem key={group.id} item={group} />
          ))}
        </div>
      </div>
      {/* Section for Analysts */}
      <div className="bg-white p-4 rounded-lg shadow-md border-t mt-3">
        <h2 className="text-lg font-bold pb-4">Analysts</h2>
        <div>
          {users.map((user) => (
            <ListItem key={user.id} item={user} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CombinedList;
