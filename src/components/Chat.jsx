import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faSmile, faCamera, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { chatData } from "../constants/chatdata"; // Import chat data

// Chat bubble component
const ChatBubble = ({ message, isSender, time }) => {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} my-2`}>
      <div className={`max-w-xs p-3 rounded-lg ${isSender ? "bg-red-700 text-white" : "bg-gray-100 text-gray-700"}`}>
        <p>{message}</p>
        <p className="text-xs text-right mt-1 text-gray-400">{time}</p>
      </div>
    </div>
  );
};

// Chat component
const Chat = () => {
  const [messages, setMessages] = useState(chatData); 
  const [newMessage, setNewMessage] = useState("");

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
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg border-t">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
            <i className="fas fa-user text-gray-500"></i>
          </div>
          <div>
            <p className="font-bold">Peter</p>
            <p className="text-sm text-gray-400">Online - Last seen, 2.10pm</p>
          </div>
        </div>
        <div>
          <input type="text" placeholder="Search in chat..." className="border rounded-full px-3 py-1 text-sm" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 h-0 overflow-y-auto">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg.message} isSender={msg.isSender} time={msg.time} />
        ))}
      </div>

      {/* Footer with Updated Input Box */}
      <div className="flex items-center p-4  relative px-10">
        <div className="relative flex items-center w-full rounded-full bg-pink-100">
          {/* Paperclip icon */}
          <button className="absolute left-4 text-gray-500">
            <FontAwesomeIcon icon={faPaperclip} />
          </button>

          {/* Input field */}
          <input
            type="text"
            className="w-full pl-12 pr-20 py-3 rounded-full bg-pink-100 border-none placeholder-gray-500 text-gray-700 focus:outline-none"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />

          {/* Emoji icon */}
          <button className="absolute right-16 text-gray-500">
            <FontAwesomeIcon icon={faSmile} />
          </button>

          {/* Camera icon */}
          <button className="absolute right-10 text-gray-500">
            <FontAwesomeIcon icon={faCamera} />
          </button>

          {/* Send button */}
          <button onClick={handleSendMessage} className="absolute right-4 text-red-500">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
