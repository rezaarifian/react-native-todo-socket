import { io } from "socket.io-client";

const socket = io.connect("http://192.168.100.88:4000");
export default socket;
