import React from "react";
import { groups } from "../constants/groupsData";

const GroupItem = ({ group }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        {/* Group image */}
        <img src={group.img} alt={group.name} className="w-10 h-10 rounded-full" />
        <div>
          {/* Group name and last message */}
          <p className="font-bold">{group.name}</p>
          <p className="text-sm text-gray-500">{group.message}</p>
        </div>
      </div>
      <div className="text-right">
        {/* Time */}
        <p className="text-sm text-gray-400">{group.time}</p>
        {/* Checkmark icon if read (optional, adjust according to your data structure) */}
        {group.status === "read" && (
          <span className="text-green-500">&#10004;&#10004;</span>
        )}
        {/* Notification badge (if there are notifications) */}
        {group.notification > 0 && (
          <span className="text-xs text-white bg-red-500 px-2 py-1 rounded-full">
            {group.notification}
          </span>
        )}
      </div>
    </div>
  );
};

const GroupsList = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 border-t"> {/* Updated shadow and padding */}
      <h2 className="text-lg font-bold pb-4">NorthLark Groups</h2> {/* Updated title */}
      <div>
        {groups.map((group) => (
          <GroupItem key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default GroupsList;
