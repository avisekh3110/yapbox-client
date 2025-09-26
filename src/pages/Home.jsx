import { useEffect, useState } from "react";
import { socket } from "../socket";
import { ConnectionState } from "../components/ConnectionState";
import { ConnectionManager } from "../components/ConnectionManager";
import Navbar from "../components/Navbar";
import Message from "../components/message";

export default function () {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setmessages] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", function onMessage(message) {
      setmessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message");
    };
  }, []);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit("user-message", [value, socket.id], () => {
      setIsLoading(false);
    });
    setValue("");
  }

  return (
    <div className="flex justify-center items-center h-screen w-full min-h-screen bg-[#2f3136] flex-col text-gray-200">
      <div className="bg-[#36393f] p-6  gap-4 flex flex-col h-full w-full">
        <ConnectionState isConnected={isConnected} />
        <ConnectionManager />

        <div className="h-[77%] bg-[#2f3136] rounded-lg p-4 flex flex-col gap-3 overflow-y-auto">
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
          className="flex gap-2 mt-2 bg-[#40444b] rounded-lg px-3 py-2"
        >
          <input
            type="text"
            className="flex-1 bg-transparent focus:outline-none text-gray-200 placeholder-gray-400"
            placeholder="Message #general"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
            disabled={isLoading || !value.trim()}
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}
