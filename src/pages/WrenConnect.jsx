import { useState } from "react";
import Searchbar from "../components/Searchbar";
import AdminList from "../components/AdminList";
import Chat from "../components/Chat";
import NewChatButton from "../components/NewChatButtion";
import { users as initialUsers, groups as initialGroups } from "../constants/usersData";

function WrenConnect() {
  const [activeId, setActiveId] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [groups, setGroups] = useState(initialGroups);

  const updateChatList = (newChat) => {
    if (newChat.type === "user") {
      setUsers([...users, newChat.user]); // Add new user to users list
    } else if (newChat.type === "group") {
      setGroups([...groups, newChat.group]); // Add new group to groups list
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      <div className="bg-white p-4 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div className="flex-grow mr-5">
            <Searchbar />
          </div>
          <div>
            <NewChatButton 
              activeId={activeId}
              setActiveId={setActiveId}
              setActiveType={setActiveType}
              users={users}
              updateChatList={updateChatList}  // Pass the update function
            />
          </div>
        </div>
        <AdminList
          activeId={activeId}
          setActiveId={setActiveId}
          activeType={activeType}
          setActiveType={setActiveType}
          users={users}
          groups={groups}
        />
      </div>
      <div className="w-4/5 flex-1 h-full px-9 bg-white">
        <Chat activeId={activeId} activeType={activeType} />
      </div>
    </div>
  );
}

export default WrenConnect;
