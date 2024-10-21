import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

const Chat = () => {
  return (
    <div className="rounded-lg flex justify-center items-center w-[150vh] bg-gray-100">
      <div className="bg-white rounded-lg shadow p-4 my-4 w-[140vh]">
        {
          //Seccion mensajes
        }
        <div className="flex flex-col h-[80vh] overflow-y-auto">
          <MessageList />

        </div>
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;
