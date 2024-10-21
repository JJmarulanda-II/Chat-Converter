import useStore from "../src/hooks/useStore";
import "./App.css";
import Chat from "./components/Chat";
import WelcomeChat from "./components/WelcomeChat";
import useSocket from "./hooks/useSocket";

const App = () => {
  const { chatStarted } = useStore();
  useSocket();

  return (
    <div>
      {!chatStarted ? (
        <WelcomeChat />
      ) : (
        <>
          <Chat />
        </>
      )}
    </div>
  );
};

export default App;
