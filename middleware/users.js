import io from 'socket.io-client';
import * as actions from 'actions/users'

const SERVER_URL = "http://localhost:8000";

export default function(store) {
  const socket = io.connect(`${SERVER_URL}`);


  var clientActions = {
    'set username': setUsername,
    'send message': sendMessage,
    'clean input': cleanInput
  };


  var socketEvents = {
    'login': login,
    'new message': newMessage,
    'user joined': userJoined,
    'user left': userLeft,
    'typing': typing,
    'stop typing': stopTyping
  };

  for (var key in socketEvents) {
    socket.on(key, socketEvents[key].bind(socket));
  }


}