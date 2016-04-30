
import socketIO from 'socket.io-client';
const socket = socketIO().connect('http://localhost:8000');
export {socket};
