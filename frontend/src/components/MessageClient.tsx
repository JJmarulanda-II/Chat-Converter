import React from "react";

interface MessageClientProps {
  message: string;
  name: string; 
  date: Date; 
}

export const MessageClient: React.FC<MessageClientProps> = ({
  message,
  name,
  date,
}) => {
  return (
    <div className="flex items-start mt-5 mb-4 justify-end">
      <div className="flex flex-col">
        <div className="flex flex-row gap-6">
          <div className="text-gray-700 font-semibold">{name}</div>{" "}
          {/* Nombre */}
          <div className="text-gray-500 text-xs mt-2">{date ? date.toLocaleString() : new Date().toUTCString()}</div> {/* Fecha */}
        </div>
        <div className="bg-blue-500 p-3 rounded-lg text-white text-sm ">
          {message}
        </div>
      </div>
      <img
        src="https://www.svgrepo.com/show/271870/tongue-emoji.svg"
        alt="Avatar"
        className="w-10 h-10 rounded-full ml-3"
      />
    </div>
  );
};

export default MessageClient;
