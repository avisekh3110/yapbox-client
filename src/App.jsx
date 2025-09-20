import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";

function App() {
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
    <div className="flex justify-center items-center h-screen min-h-screen bg-gray-100 flex-col">
      <ConnectionState isConnected={isConnected} />
      {/* <Events events={fooEvents} /> */}
      <ConnectionManager />
      <div className="bg-white p-8 rounded-xl shadow-md h-1/2 min-w-[350px]">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-base"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button
            className="px-5 py-2 bg-blue-700 text-white rounded font-bold cursor-pointer hover:bg-blue-900"
            onClick={onSubmit}
          >
            SEND
          </button>
        </div>
        <div>
          <div className="font-bold mb-2">Received Messages</div>
          <div className="h-80 bg-gray-200 rounded p-2 flex flex-col gap-2">
            {messages.map((element, index) => (
              <div key={index} className="bg-blue-200 rounded p-2">
                <div className="text-xs">
                  {element[1] == socket.id ? "Me" : element[1]}
                </div>
                <div className="text-lg font-bold">{element[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
