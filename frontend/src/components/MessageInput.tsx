import React, { useState } from "react";
import useStore from "../hooks/useStore";
import Message from "../interfaces/Message";

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const { addMessage, socket, userName } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage: Message = {
      id: userName,
      body: message,
      timestamp: new Date(),
      sender: 'Usuario',
      userName: userName
    };
    addMessage(newMessage);
    setMessage("");
    socket.emit("message", newMessage.body);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row border-t border-gray-300 mt-4 pt-4"
    >
      <input
        type="text"
        placeholder="Write your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-gray-300 rounded-lg h-12 w-full px-4 text-white"
      />
      <button type="submit">
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
  );
};

export default MessageInput;
