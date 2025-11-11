import { useEffect, useState, useContext } from "react";
import { ConnectionState } from "../components/ConnectionState";
import { ConnectionManager } from "../components/ConnectionManager";
import Message from "../components/Message";
import { ThemeContext } from "../context/ThemeProvider.jsx";
import { IsLoggedinContext } from "../context/IsLoggedinProvider.jsx";
import { useRef } from "react";
import vclogo from "/vclogo.svg";
import aclogo from "/aclogo.svg";
import { Link } from "react-router-dom";
import { useSocket } from "../context/SocketProvider.jsx";

export default function Chats() {
  const socket = useSocket();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(IsLoggedinContext);
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
    socket.timeout(5000).emit("user-message", [value, user?.username], () => {
      setIsLoading(false);
    });
    setValue("");
  }

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`w-[95%] h-[80%] p-2 flex flex-col rounded-md ${
        darkMode
          ? "bg-secondary-dark-b text-tertiary-dark"
          : "bg-secondary-b text-tertiary"
      }`}
    >
      {/* <ConnectionState isConnected={isConnected} />
      <ConnectionManager /> */}

      <div className="h-14 flex justify-center items-center gap-2">
        <div className="px-6 font-medium bg-secondary-dark-c w-[85%] h-full flex justify-start items-center rounded-sm">
          WORLD CHAT
        </div>
        <div className="flex w-[15%] h-full justify-center items-center rounded-sm px-5 gap-2 bg-white">
          <Link to={"/videocall"} className="cursor-pointer">
            <img
              className="min-h-6 min-w-6 h-7 w-7 "
              src={vclogo}
              alt="videocall"
            />
          </Link>
        </div>
      </div>
      <div
        className={`h-full w-full flex flex-col gap-3 mt-2 overflow-y-auto rounded-sm hide-scrollbar bg-transparent`}
      >
        {messages.map((element, index) => (
          <Message
            key={`${element}-${index}`}
            element={element}
            index={index}
            username={user.username}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={onSubmit}
        className={`flex gap-2 mt-2 rounded-sm px-3 py-2 ${
          darkMode ? "bg-secondary-dark-c" : "bg-tertiary-dark"
        }`}
      >
        <input
          type="text"
          className={`flex-1 bg-transparent focus:outline-none  ${
            darkMode
              ? "text-tertiary-dark placeholder-gray-400"
              : "text-tertiary placeholder-gray-900"
          }`}
          placeholder="Message #general"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="px-5 py-2 bg-primary-b text-tertiary-dark rounded-sm font-semibold hover:bg-primary-c disabled:opacity-50"
          disabled={isLoading || !value.trim()}
        >
          SEND
        </button>
      </form>
    </div>
  );
}
