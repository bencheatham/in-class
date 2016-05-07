import io from 'socket.io-client';
// import chatSocketListeners from '../chat/socket'
// import questionSocketListeners from '../question/socket'
// import quizSocketListeners from '../quiz/socket'
// import thumbSocketListeners from '../thumbs/socket'

var websocket;

export function connectToWebSockets(){
  websocket = (process.env.NODE_ENV === 'production')? io().connect('https://in-class.herokuapp.com'): io().connect('http://localhost:8000');
  return websocket;
}

export function initiateWebSocketListeners (){
  // chatSocketListeners(websocket);
  // questionSocketListeners(socket);
  // quizSocketListeners(socket);
  // thumbSocketListeners(socket);
}

export function disconnectFromWebSocket (){
  websocket.disconnet();
}