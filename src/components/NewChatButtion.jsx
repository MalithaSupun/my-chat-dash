import React, { useState } from "react";
import { FaPlus, FaTimes, FaPaperPlane } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewChatButton = ({ activeId, setActiveId, setActiveType, users, updateChatList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupPhoto, setGroupPhoto] = useState(null);
  const [isGroupMode, setIsGroupMode] = useState(false); // Toggle between individual and group modes

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsGroupMode(false); // Reset to individual chat mode when modal is toggled
  };

  // Handle selecting a user for a new chat
  const handleSelectUser = (userId) => {
    const selectedUser = users.find((user) => user.userId === userId);
    updateChatList({ type: "user", user: selectedUser }); // Update the chat list with new user
    setActiveId(userId); // Set the selected user as active
    setActiveType("user");
    toggleModal(); // Close modal after selection
  };

  // Handle selecting users for a group
  const handleToggleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Handle creating group chat
  const handleCreateGroup = () => {
    if (groupName.trim() === "" || selectedUsers.length < 3) {
      toast.error("Group name and at least three users are required!");
      return;
    }

    const newGroup = {
      groupId: Math.random().toString(36).substr(2, 9), // Generate random group ID
      name: groupName,
      img: groupPhoto, // Group photo if provided
      chatData: [], // Empty chat data for new group
      notification: 0, // No notifications initially
    };

    updateChatList({ type: "group", group: newGroup }); // Update the chat list with new group
    setGroupName(""); // Clear input fields after creating group
    setGroupPhoto(null);
    setSelectedUsers([]);
    toggleModal(); // Close modal after creation
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <button
        className="flex items-center text-gray-600 text-sm p-2 bg-gray-200 hover:bg-slate-300 rounded-full cursor-pointer mt-2"
        onClick={toggleModal}
      >
        <FaPlus className="mr-1" />
        New Chat
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {isGroupMode ? "Create a Group" : "Start a New Chat"}
              </h2>
              <button onClick={toggleModal} className="text-gray-600 text-xl">
                <FaTimes />
              </button>
            </div>

            <div className="flex justify-between mb-4">
              <button
                className={`p-2 w-1/2 ${!isGroupMode ? "bg-pink-300" : "bg-slate-200"} rounded-l-lg`}
                onClick={() => setIsGroupMode(false)}
              >
                Individual Chat
              </button>
              <button
                className={`p-2 w-1/2 ${isGroupMode ? "bg-pink-300" : "bg-slate-200"} rounded-r-lg`}
                onClick={() => setIsGroupMode(true)}
              >
                Create Group
              </button>
            </div>

            {isGroupMode ? (
              <>
                {/* Group Chat Section */}
                <input
                  type="text"
                  placeholder="Group Name"
                  className="w-full p-2 border rounded-lg mb-4"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setGroupPhoto(URL.createObjectURL(e.target.files[0]))}
                  className="w-full p-2 mb-4"
                />

                {groupPhoto && (
                  <img src={groupPhoto} alt="Group" className="w-20 h-20 rounded-full mb-4" />
                )}

                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full p-2 border rounded-lg mb-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="max-h-72 overflow-y-auto">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <div
                        key={user.userId}
                        className="p-2 border-b cursor-pointer hover:bg-gray-100 rounded"
                        onClick={() => handleToggleUserSelect(user.userId)}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.userId)}
                            onChange={() => handleToggleUserSelect(user.userId)}
                          />
                          <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="font-bold">{user.name}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No users found</p>
                  )}
                </div>

                <button
                  className="bg-pink-400 text-white w-full p-2 mt-4 rounded-lg"
                  onClick={handleCreateGroup}
                >
                  Create Group
                </button>
              </>
            ) : (
              <>
                {/* Individual Chat Section */}
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full p-2 border rounded-lg mb-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="max-h-72 overflow-y-auto">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <div
                        key={user.userId}
                        className="p-2 border-b cursor-pointer hover:bg-gray-100 rounded"
                        onClick={() => handleSelectUser(user.userId)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full" />
                            <div>
                              <p className="font-bold">{user.name}</p>
                            </div>
                          </div>
                          <FaPaperPlane size={20} color="pink" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No users found</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default NewChatButton;
