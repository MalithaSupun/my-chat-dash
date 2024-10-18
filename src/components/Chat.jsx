import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faSmile,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Picker from "emoji-picker-react";
import { users, groups } from "../constants/usersData"; // Import users and groups

// Chat bubble component
const ChatBubble = ({ message, isSender, time }) => {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isSender ? "bg-red-700 text-white" : "bg-gray-100 text-gray-700"
        }`}
      >
        <p>{message}</p>
        <p className="text-xs text-right mt-1 text-gray-400">{time}</p>
      </div>
    </div>
  );
};

const getChatDataByUserId = (userId) => {
  // Use the find method to get the user object with the specified userId
  const user = users.find((user) => user.userId === userId);

  // Check if user is found, then return the chatData or an empty array if not found
  if (user) {
    return user.chatData;
  } else {
    console.warn(`User with ID ${userId} not found`);
    return []; // Return an empty array if user is not found
  }
};

const getChatDataByGroupId = (groupId) => {
  // Use the find method to get the group object with the specified groupId
  const group = groups.find((group) => group.groupId === groupId);

  // Check if group is found, then return the chatData or an empty array if not found
  if (group) {
    return group.chatData;
  } else {
    console.warn(`Group with ID ${groupId} not found`);
    return []; // Return an empty array if group is not found
  }
};

// Chat component
const Chat = ({ activeId, activeType }) => {
  const [lastSeen, setLastSeen] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [messages, setMessages] = useState([]);
  const [headerName, setHeaderName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    if (activeId && activeType === "user") {
      const chatData = getChatDataByUserId(activeId);
      setMessages(chatData);
      const user = users.find((user) => user.userId === activeId);
      setHeaderName(user ? user.name : "Unknown User");
      setLastSeen(user ? user.time : "");
      setProfilePic(user ? user.img : "");
    } else if (activeId && activeType === "group") {
      const group = groups.find((group) => group.groupId === activeId);
      setHeaderName(group ? group.name : "Unknown Group");
      setMessages(group ? group.chatData : []);
      setProfilePic(group ? group.img : ""); // Assuming groups have an img property
      setLastSeen(""); // You can set this based on group details if needed
    }
  }, [activeId, activeType]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle sending message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newChat = {
        id: messages.length + 1,
        sender: "You",
        message: newMessage,
        time: "Now",
        isSender: true,
      };
      setMessages([...messages, newChat]);
      setNewMessage(""); // Reset newMessage after sending
    }

    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        const newFileMessage = {
          id: messages.length + 1,
          sender: "You",
          message: `Sent a file: ${file.name}`,
          time: "Now",
          isSender: true,
        };
        setMessages((prevMessages) => [...prevMessages, newFileMessage]);
      });
      setSelectedFiles(null); // Reset selectedFiles after sending
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  // Remove selected files
  const handleRemoveFiles = () => {
    setSelectedFiles(null);
  };

  // Handle emoji click
  const handleEmojiClick = (emoji) => {
    setNewMessage(newMessage + emoji.emoji);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg border-t">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
         <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              /> 
            ) : (
              <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-gray-500"></i>
              </div>
            )}
          </div>
          <div>
            <p className="font-bold">{headerName}</p>
            <p className="text-sm text-gray-400">{lastSeen}</p>
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search in chat..."
            className="border rounded-full px-3 py-1 text-sm"
          />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 h-0 overflow-y-auto">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.message}
            isSender={msg.isSender}
            time={msg.time}
          />
        ))}
      </div>

      {/* Footer with Updated Input Box */}
      <div className="flex flex-col items-center p-4 relative px-10">
        {/* Show selected files bar if any files are selected */}
        {selectedFiles && (
          <div className="flex items-center mb-2 w-full bg-gray-200 rounded-lg p-2 text-sm">
            <div className="flex-grow text-gray-700">
              {Array.from(selectedFiles).map((file, idx) => (
                <span key={idx}>
                  {file.name}
                  {idx < selectedFiles.length - 1 && ", "}
                </span>
              ))}
            </div>
            <button onClick={handleRemoveFiles} className="text-gray-500 ml-2">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}

        <div className="relative flex items-center w-full rounded-full bg-pink-100">
          {/* Paperclip icon */}
          <button
            className="absolute left-4 text-gray-500"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <FontAwesomeIcon icon={faPaperclip} />
          </button>

          {/* Hidden file input */}
          <input
            id="fileInput"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* Input field */}
          <input
            type="text"
            className="w-full pl-12 pr-20 py-3 rounded-full bg-pink-100 border-none placeholder-gray-500 text-gray-700 focus:outline-none"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />

          {/* Emoji icon */}
          <button
            className="absolute right-10 text-gray-500"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <FontAwesomeIcon icon={faSmile} />
          </button>

          {/* Emoji picker */}
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className="absolute bottom-14 right-10 z-10"
            >
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {/* Send button */}
          <button
            onClick={handleSendMessage}
            className="absolute right-4 text-red-500"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
