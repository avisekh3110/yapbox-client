import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

export function ConnectionManager() {
  const socket = useSocket();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="flex gap-3 mb-4">
      {/* Connect Button */}
      <button
        onClick={() => socket.connect()}
        disabled={isConnected}
        className={`w-28 py-2 px-4 rounded-full font-semibold transition 
          ${
            isConnected
              ? "bg-green-800 text-green-300 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600 shadow-md"
          }`}
      >
        Connect
      </button>

      <button
        onClick={() => socket.disconnect()}
        disabled={!isConnected}
        className={`w-28 py-2 px-4 rounded-full font-semibold transition
          ${
            !isConnected
              ? "bg-red-800 text-red-300 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600 shadow-md"
          }`}
      >
        Disconnect
      </button>
    </div>
  );
}
