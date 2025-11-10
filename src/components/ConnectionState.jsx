import React from "react";
import { useSocket } from "../context/SocketProvider";

export function ConnectionState({ isConnected }) {
  const socket = useSocket();
  return (
    <div className="flex gap-2 font-bold font-mono">
      {socket.id && <p>User: {socket.id}</p>}
      <p className={`${isConnected ? "text-green-600" : "text-red-500"}`}>
        {isConnected ? "Connected" : "disconnected"}
      </p>
    </div>
  );
}
