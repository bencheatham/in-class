import { connectToWebSockets } from '../common/socket';

var socket;

export function initializeWebSockets() {
  socket = connectToWebSockets();
  
  socket.on('chatMessage-submitted', data => {
    this.props.actions.submitChat(data.chatMessage);
  });

  socket.on('init-chat', data => {
    this.props.actions.loadChatMessages(data.chatLog);
  });

};

export function closeWebSockets(){
  socket.disconnect();
}

export function emitChatMessage(text,name){
  
  socket.emit('chatMessage-submitted', {
      username : name,
      text: text,
      timestamp: Date.now(),
    });
}

export function loadChatMessages(text,name){
  socket.emit('init-chat', {});
}