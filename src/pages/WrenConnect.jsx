import { useState } from "react";
import Searchbar from "../components/Searchbar";
import AdminList from "../components/AdminList";
import Chat from "../components/Chat";
import NewChatButton from "../components/NewChatButtion";
import { users, groups } from "../constants/usersData"; // Import the data here

function WrenConnect() {
  const [activeId, setActiveId] = useState(null);
  const [activeType, setActiveType] = useState(null); // 'group' or 'user'

  return (
    <div className="flex h-full bg-gray-50">
      <div className="bg-white p-4 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div className="flex-grow mr-5">
            <Searchbar />
          </div>
          <div>
            {/* Pass activeId and setter to NewChatButton */}
            <NewChatButton 
              activeId={activeId}
              setActiveId={setActiveId}
              setActiveType={setActiveType}
              users={users}  // Pass the users data here
            />
          </div>
        </div>
        {/* Pass the users and groups data as props */}
        <AdminList
          activeId={activeId}
          setActiveId={setActiveId}
          activeType={activeType}
          setActiveType={setActiveType}
          users={users}  // Pass users data
          groups={groups}  // Pass groups data
        />
      </div>
      <div className="w-4/5 flex-1 h-full px-9 bg-white">
        <Chat activeId={activeId} activeType={activeType} />
      </div>
    </div>
  );
}

export default WrenConnect;
