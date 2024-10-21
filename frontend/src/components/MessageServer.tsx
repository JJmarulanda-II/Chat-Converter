import React from "react";

interface MessageServerProps {
  message: string;
  name: string;
  date: Date;
}

export const MessageServer: React.FC<MessageServerProps> = ({
  message,
  name,
  date,
}) => {
  return (
    <div className="flex items-start mb-2">
      <img
        src="https://www.svgrepo.com/show/271900/cool-emoji.svg"
        alt="avatar"
        className="w-10 h-10 rounded-full mr-3 mt-1"
      />
      <div className="flex flex-col">
        <div className="flex flex-row gap-6">
          <div className="text-gray-700 font-semibold">{name}</div>{" "}
          <div className="text-gray-500 text-xs mt-2">
            {date ? date.toLocaleString() : new Date().toUTCString()}
          </div>
        </div>
        <div className="bg-gray-200 p-3 rounded-lg text-gray-700 text-sm text-justify ">
          {message.split("\n").map((line, index) => (
            <div key={index}>{line}</div> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageServer;
