import { useEffect, useState, useContext } from "react";
import { socket } from "../socket";
import { ConnectionState } from "../components/ConnectionState";
import { ConnectionManager } from "../components/ConnectionManager";
import Message from "../components/Message";
import { ThemeContext } from "../context/ThemeContext";

export default function Chats() {
  const { darkMode } = useContext(ThemeContext);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(message) {
      setMessages((prev) => [...prev, message]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
    };
  }, []);

  function onSubmit(event) {
    event.preventDefault();
    if (!value.trim()) return;

    setIsLoading(true);
    socket.timeout(5000).emit("user-message", [value, socket.id], () => {
      setIsLoading(false);
    });
    setValue("");
  }

  return (
    <div
      className={`p-6 gap-4 flex flex-col h-8/10 w-[95%] rounded-lg ${
        darkMode
          ? "bg-secondary-dark-c text-tertiary-dark"
          : "bg-secondary-b text-tertiary"
      }`}
    >
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />

      <div
        className={`h-[77%] rounded-lg p-4 flex flex-col gap-3 overflow-y-auto ${
          darkMode ? "bg-secondary-dark-b" : "bg-secondary-a"
        }`}
      >
        {messages.map((element, index) => (
          <Message
            key={`${element}-${index}`}
            element={element}
            index={index}
            socketid={socket.id}
          />
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        className={`flex gap-2 mt-2 rounded-lg px-3 py-2 ${
          darkMode ? "bg-secondary-dark-b" : "bg-secondary-c"
        }`}
      >
        <input
          type="text"
          className={`flex-1 bg-transparent focus:outline-none ${
            darkMode
              ? "text-tertiary-dark placeholder-gray-400"
              : "text-tertiary placeholder-gray-500"
          }`}
          placeholder="Message #general"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="px-5 py-2 bg-primary-b text-tertiary-dark rounded font-semibold hover:bg-primary-c disabled:opacity-50"
          disabled={isLoading || !value.trim()}
        >
          SEND
        </button>
      </form>
    </div>
  );
}
