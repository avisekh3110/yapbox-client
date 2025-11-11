import React from "react";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { useSocket } from "../context/SocketProvider";
import { useCallback } from "react";
import { IsLoggedinContext } from "../context/IsLoggedinProvider";
import { toast } from "react-toastify";
import peer from "../service/peer.js";
import ReactPlayer from "react-player";

function VideoCall() {
  const userJoinedToast = (username) => {
    toast.success(`${username} joined the room`);
  };

  const { darkMode } = useContext(ThemeContext);
  const [callId, setCallId] = useState("");
  const [inCall, setInCall] = useState(false);
  const [connected, setConnected] = useState(false);
  const [remoteUser, setRemoteUser] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteUserStream, setRemoteStream] = useState();

  const socket = useSocket();
  const { user } = useContext(IsLoggedinContext);
  const username = user.username;

  const handleClick = useCallback(() => {
    socket.emit("join-room", { callId, username });
  }, [callId, username, socket]);

  const handleJoinRoom = useCallback((data) => {
    const { callId, username } = data;
    console.log(`joined room ${callId} as ${username}`);
  }, []);

  const handleUserJoined = useCallback(({ username, id }) => {
    if (id != socket.id) {
      userJoinedToast(username);
      setRemoteUser(id);
    }
  }, []);

  const handleUserStream = useCallback(async () => {
    setInCall(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);

    // stream.getTracks().forEach((track) => {
    //   peer.peer.addTrack(track, stream);
    // });
    const offer = await peer.getOffer();
    socket.emit("user-call", { to: remoteUser, offer });
    console.log("stream created!!");
  }, [remoteUser, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      console.log(`Incoming call from ${from}`);
      console.log(offer);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      // stream.getTracks().forEach((track) => {
      //   peer.peer.addTrack(track, stream);
      // });
      const ans = await peer.getAnswer(offer);
      socket.emit("call-accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStream = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      console.log(ans);
      peer.setLocalDescription(ans);
      console.log(`${from} Accepted the call!!`);
      sendStream();
    },
    [sendStream]
  );

  const handleNegoNeeded = useCallback(async () => {
    if (!remoteUser) return; // avoid negotiation before peer is known
    console.log("Negotiation needed...");
    const offer = await peer.getOffer();
    socket.emit("peer-nego-needed", { to: remoteUser, offer });
  }, [remoteUser, socket]);

  const handleNegoIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer-nego-done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
    console.log("Negotiation Done!!");
    setConnected(true);
  }, []);

  //for negotiation
  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  //for video tracks
  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
      console.log(remoteStream[0] instanceof MediaStream);
    });
  }, []);

  //for sockets
  useEffect(() => {
    socket.on("join-room", handleJoinRoom);
    socket.on("user-joined", handleUserJoined);
    socket.on("incomming-call", handleIncommingCall);
    socket.on("call-accepted", handleCallAccepted);
    socket.on("peer-nego-needed", handleNegoIncomming);
    socket.on("peer-nego-final", handleNegoFinal);

    return () => {
      socket.off("join-room", handleJoinRoom);
      socket.off("user-joined", handleUserJoined);
      socket.off("incomming-call", handleIncommingCall);
      socket.off("call-accepted", handleCallAccepted);
      socket.off("peer-nego-needed", handleNegoIncomming);
      socket.off("peer-nego-final", handleNegoFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleJoinRoom,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoIncomming,
    handleNegoFinal,
  ]);

  return (
    <div
      className={`w-[95%] h-[80%] p-2 flex flex-col rounded-md border border-gray-700 gap-2 ${
        darkMode
          ? "bg-tertiary text-tertiary-dark"
          : "bg-secondary-b text-tertiary"
      }`}
    >
      <div className="flex bg-black border border-gray-700 p-2 rounded-sm w-96">
        <input
          value={callId}
          onChange={(e) => setCallId(e.target.value)}
          placeholder="Enter peer ID"
          type="text"
          className="border border-gray-700 flex px-2 py-1 w-64 rounded-s-sm focus:outline-none"
        />
        <button
          onClick={handleClick}
          className="flex justify-center items-center bg-blue-400 font-bold hover:bg-blue-700 w-26  rounded-e-sm duration-300"
        >
          JOIN
        </button>
      </div>

      <div className="h-[80%] w-full border border-gray-700 p-2 flex justify-between rounded-sm">
        <div className="h-full w-[70%] border border-gray-700 rounded-sm">
          <video
            ref={(video) => {
              if (video && remoteUserStream) {
                console.log(remoteUserStream);
                video.srcObject = remoteUserStream;
              }
            }}
            autoPlay
            muted
            playsInline
            className="w-full h-full rounded"
          />
        </div>
        <div className="h-40 w-[28%] border border-gray-700 rounded-sm">
          <video
            ref={(video) => {
              if (video && myStream) {
                video.srcObject = myStream;
              }
            }}
            autoPlay
            muted
            playsInline
            className="w-full h-full rounded"
          />
          {inCall && (
            <p className="text-green-400 mt-2">
              {connected ? "Connected!" : "Calling..."}
            </p>
          )}
          {remoteUserStream && (
            <p className="text-green-400 mt-2">connected!</p>
          )}
        </div>
      </div>
      <div className=" w-full flex justify-center items-center h-[10%] gap-2 p-2 ">
        <button className="h-[90%] flex items-center justify-center bg-gray-500  hover:bg-gray-700 cursor-pointer px-6 rounded-sm font-semibold">
          MUTE
        </button>
        {inCall ? (
          <button className="h-[90%] flex items-center justify-center bg-red-400 px-6 font-semibold rounded-sm">
            END
          </button>
        ) : (
          <button
            disabled={!remoteUser}
            onClick={handleUserStream}
            className="h-[90%] flex items-center justify-center bg-green-400 px-6 font-semibold rounded-sm disabled:bg-green-950"
          >
            CALL
          </button>
        )}
        <button
          onClick={sendStream}
          className="h-[90%] flex items-center justify-center bg-gray-500 hover:bg-gray-700 cursor-pointer px-6 rounded-sm font-semibold"
        >
          VIDEO
        </button>
      </div>
    </div>
  );
}

export default VideoCall;
