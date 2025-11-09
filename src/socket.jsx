import { io } from "socket.io-client";
import { LocalPort } from "./const.js";

// "undefined" means the URL will be computed from the `window.location` object
const URL = `${LocalPort}`;

export const socket = io(URL, {
  transports: ["websocket"], // optional: force WS only
  withCredentials: true,
});
