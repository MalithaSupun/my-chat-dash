// WrenConnect.jsx
import React from "react";
import GroupsList from "../components/GroupList";
import Searchbar from "../components/Searchbar";
import NorthLarkAdmins from "../components/NorthLarkAdmins";
import Chat from "../components/Chat";
import NewChatButtion from "../components/NewChatButtion";

function WrenConnect() {
  return (
    <div className="flex h-full bg-gray-50">
      <div className="bg-white p-4 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div className="flex-grow mr-5">
            <Searchbar />
          </div>

          <div>
            <NewChatButtion />
          </div>
        </div>

        <div className="mt-5 mb-2">
          <GroupsList />
        </div>
        <NorthLarkAdmins />
      </div>

      <div className="w-4/5 flex-1 h-full px-9 bg-white">
        <Chat />
      </div>
    </div>
  );
}

export default WrenConnect;