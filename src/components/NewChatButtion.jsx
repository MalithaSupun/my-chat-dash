import React, { useState } from "react";
import { FaPlus, FaTimes, FaPaperPlane } from "react-icons/fa";
import { users } from "../constants/usersData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewChatModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGroupMode, setIsGroupMode] = useState(false);
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [isGroupFormVisible, setIsGroupFormVisible] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null); // To track the active user

  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    country: "",
    mobile: "",
  });

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsGroupMode(false);
    setSelectedUsers([]);
    setIsGroupFormVisible(false);
    setIsContactFormVisible(false);
    setActiveUserId(null); // Reset active user when closing the modal
  };

  // Select a user for group or make active user
  const handleSelectUser = (userId) => {
    if (isGroupMode) {
      // Handle group selection logic with checkboxes
      if (selectedUsers.includes(userId)) {
        setSelectedUsers(selectedUsers.filter((id) => id !== userId));
      } else {
        setSelectedUsers([...selectedUsers, userId]);
      }
    } else {
      // If not in group mode, set the active user
      setActiveUserId(userId);
    }
  };

  // Send message to a user
  const handleSendMessage = (user) => {
    toast.success(`Start chat with ${user.name}`);
  };

  // Proceed to group creation
  const handleCreateGroup = () => {
    setIsGroupFormVisible(true);
  };

  // Finalize group creation
  const finalizeGroupCreation = () => {
    if (groupName.trim() === "") {
      toast.error("Please enter a group name");
      return;
    }
    const groupMembers = users.filter((user) =>
      selectedUsers.includes(user.userId)
    );
    toast.success(
      `Group "${groupName}" created with: ${groupMembers
        .map((user) => user.name)
        .join(", ")}`
    );
    toggleModal();
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle group image selection
  const handleGroupImageChange = (e) => {
    setGroupImage(e.target.files[0]);
  };

  // Handle contact form input changes
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  // Add a new contact
  const handleAddContact = () => {
    if (
      newContact.firstName &&
      newContact.lastName &&
      newContact.country &&
      newContact.mobile
    ) {
      alert(
        `New contact added: ${newContact.firstName} ${newContact.lastName}`
      );
      toggleModal();
    } else {
      toast.error("Please fill in all the fields");
    }
  };

  return (
    <>
      {/* New chat button */}
      <button
        className="flex items-center text-gray-600 text-sm p-2 bg-gray-200 hover:bg-slate-300 rounded-full cursor-pointer mt-2"
        onClick={toggleModal}
      >
        <FaPlus className="mr-1" />
        New Chat
      </button>

      {/* Modal for New Chat */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {isGroupMode
                  ? isGroupFormVisible
                    ? "Finalize Group"
                    : "Create a New Group"
                  : "Start a New Chat"}
              </h2>
              <button onClick={toggleModal} className="text-gray-600 text-xl">
                <FaTimes />
              </button>
            </div>

            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full p-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* New Group Button */}
            {!isGroupMode && (
              <div className="flex justify-between space-x-2 mb-4">
                <button
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => {
                    setIsGroupMode(true);
                    setActiveUserId(null); // Reset active user when switching to group mode
                  }}
                >
                  New Group
                </button>
              </div>
            )}

            {/* User List */}
            <div className="max-h-72 overflow-y-auto">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.userId}
                    className={`flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100 rounded ${
                      !isGroupMode && activeUserId === user.userId
                        ? "bg-blue-100"
                        : "" // Apply background color only if not in group mode
                    }`}
                    onClick={() => handleSelectUser(user.userId)}
                  >
                    <div className="flex items-center space-x-3">
                      {isGroupMode && (
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.userId)}
                          onChange={() => handleSelectUser(user.userId)}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                      )}
                      <img
                        src={user.img}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.message}</p>
                      </div>
                    </div>
                    {!isGroupMode && (
                      <button
                        onClick={() => handleSendMessage(user)}
                        className="text-blue-500"
                      >
                        <FaPaperPlane />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>No users found.</p>
              )}
            </div>

            {/* Proceed to group creation */}
            {isGroupMode && selectedUsers.length > 0 && !isGroupFormVisible && (
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleCreateGroup}
                >
                  Create Group
                </button>
              </div>
            )}

            {/* Group Form */}
            {isGroupFormVisible && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Group Name"
                    className="w-full p-2 border rounded-lg"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGroupImageChange}
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={finalizeGroupCreation}
                  >
                    Finalize Group
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default NewChatModal;
