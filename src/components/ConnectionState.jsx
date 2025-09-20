import React from "react";
import { socket } from "../socket";

export function ConnectionState({ isConnected }) {
  return (
    <div className="flex gap-2 font-bold font-mono">
      {socket.id && <p>User: {socket.id}</p>}
      <p className={`${isConnected ? "text-green-600" : "text-red-500"}`}>
        {isConnected ? "Connected" : "disconnected"}
      </p>
    </div>
  );
}
