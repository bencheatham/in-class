import { socket } from '../common/socket';

export function initializeWebSockets() {

  socket.on('chatMessage-submitted', data => {
    console.log('web socket event')
    this.props.actions.submitChat(data.chatMessage);
  });

  socket.on('init-chat', data => {
    console.log('downloading chats')
    this.props.actions.loadChatMessages(data.chatLog);
  });
};

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