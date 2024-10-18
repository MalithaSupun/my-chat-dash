import React, { useState } from 'react';
import { FaPlus, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { users } from '../constants/usersData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewChatModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State to handle search term
  const [isGroupMode, setIsGroupMode] = useState(false); // State to handle group creation mode
  const [isContactFormVisible, setIsContactFormVisible] = useState(false); // State to handle new contact form visibility
  const [selectedUsers, setSelectedUsers] = useState([]); // State to track selected users
  const [groupName, setGroupName] = useState(''); // State to handle group name input
  const [groupImage, setGroupImage] = useState(null); // State to handle group image
  const [isGroupFormVisible, setIsGroupFormVisible] = useState(false); // State to toggle group form
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    country: '',
    mobile: '',
  }); // State to handle new contact form inputs

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsGroupMode(false); // Reset group mode when modal closes
    setSelectedUsers([]); // Reset selected users when modal closes
    setIsGroupFormVisible(false); // Hide group form on close
    setIsContactFormVisible(false); // Hide contact form on close
  };

  // Function to handle selecting a user for a group
  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Function to handle sending a message to a user
  const handleSendMessage = (user) => {
    toast.success(`Start chat with ${user.name}`); 
  };

  // Function to handle proceeding to group form after selecting users
  const handleCreateGroup = () => {
    setIsGroupFormVisible(true); // Show group form after users are selected
  };

  // Function to handle final group creation
  const finalizeGroupCreation = () => {
    if (groupName.trim() === '') {
        toast.error('Please enter a group name');
      return;
    }

    const groupMembers = users.filter((user) => selectedUsers.includes(user.id));
    toast.success(`Group "${groupName}" created with: ${groupMembers.map((user) => user.name).join(', ')}`);
    toggleModal(); // Close modal after creating the group
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle group image selection
  const handleGroupImageChange = (e) => {
    setGroupImage(e.target.files[0]); // Capture the selected image file
  };

  // Function to handle contact form input changes
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  // Function to handle submitting the new contact form
  const handleAddContact = () => {
    if (newContact.firstName && newContact.lastName && newContact.country && newContact.mobile) {
      alert(`New contact added: ${newContact.firstName} ${newContact.lastName}`);
      // You can add logic here to save the contact information
      toggleModal(); // Close the modal after adding the contact
    } else {
        toast.error('Please fill in all the fields');
    }
  };

  return (
    <>
      {/* Add new chat button */}
      <button
        className="flex items-center text-gray-600 text-sm p-2 bg-gray-200 hover:bg-slate-300 rounded-full cursor-pointer mt-2"
        onClick={toggleModal} // Open modal on click
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
                {isGroupMode ? (isGroupFormVisible ? 'Finalize Group' : 'Create a New Group') : isContactFormVisible ? 'Add New Contact' : 'Start a New Chat'}
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

                {/* New Group and New Contact Buttons */}
                {!isGroupMode && (
                  <div className="flex justify-between space-x-2 mb-4">
                    <button
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      onClick={() => setIsGroupMode(true)} // Activate group mode
                    >
                      New Group
                    </button>
                  </div>
                )}

                {/* Modal Body: Show filtered list of users */}
                <div className="max-h-72 overflow-y-auto">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100 rounded"
                      >
                        {/* User Info */}
                        <div className="flex items-center space-x-3">
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

                        {/* Checkbox for group selection or send message icon */}
                        {isGroupMode ? (
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user)}
                            onChange={() => handleSelectUser(user)}
                            />
                        ) : (
                          <button onClick={() => handleSendMessage(user.userId)} className="text-blue-500">
                            <FaPaperPlane />
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No users found.</p>
                  )}
                </div>

                {/* Proceed to group creation if group mode is active */}
                {isGroupMode && selectedUsers.length > 0 && !isGroupFormVisible && (
                  <div className="flex justify-end mt-4">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={handleCreateGroup} // Proceed to create group
                    >
                      Create Group
                    </button>
                  </div>
                )}

                {/* Group Form for finalizing the group creation */}
                {isGroupFormVisible && (
                  <div>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Group Name"
                        className="w-full p-2 border rounded-lg"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)} // Update group name
                      />
                    </div>

                    {/* Group Image Upload */}
                    <div className="mb-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleGroupImageChange} // Handle image selection
                      />
                    </div>

                    {/* Finalize Group Button */}
                    <div className="flex justify-end mt-4">
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={finalizeGroupCreation} // Create group on click
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
