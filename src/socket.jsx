import { io } from "socket.io-client";
import { LocalPort } from "./const.js";

// "undefined" means the URL will be computed from the `window.location` object
const URL = `http://${LocalPort}:5000`;

export const socket = io(URL);
