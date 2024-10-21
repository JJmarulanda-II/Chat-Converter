import React from "react";
import useStore from "../hooks/useStore";
import MessageClient from "./MessageClient";
import MessageServer from "./MessageServer";

const MessageList: React.FC = () => {
  const { messages } = useStore();

  return (
<ul>
  {messages.map((msg, index) => {

    return (
      <li key={index}>
        {msg.sender === 'server' ? (
          <MessageServer
            message={msg.body}
            name={msg.sender}
            date={msg.timestamp}
          />
        ) : (
          <MessageClient
            message={msg.body}
            name={msg.userName}
            date={msg.timestamp}
          />
        )}
      </li>
    );
  })}
</ul>

  );
};

export default MessageList;
