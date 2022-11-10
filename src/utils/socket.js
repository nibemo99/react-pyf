import { io } from "socket.io-client";

const socket = io( 'https://picas.up.railway.app/' )

export default socket