import React from "react";
import { socket } from "../socket";

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <div className="flex gap-3 mb-2">
      <button
        onClick={connect}
        className="py-2 poine w-20 px-2 border-2 rounded-lg"
      >
        Connect
      </button>
      <button
        onClick={disconnect}
        className="py-2 w-28 border-2 p-2 rounded-lg mr-2"
      >
        Disconnect
      </button>
    </div>
  );
}
