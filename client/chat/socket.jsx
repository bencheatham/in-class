import { socket } from '../common/socket';

export function initializeWebSockets() {

  socket.on('chatMessage-submitted', data => {
    console.log ('received chat');
    this.props.actions.submitChat(data.chatMessage);
  });
  socket.on('chatMessage-returned-with-id', data => {
    this.props.actions.submitChat(data.chatMessage);
  });

};

export function emitChatMessage(text,name){
  console.log ('emit');
  socket.emit('chatMessage-submitted', {
      username : name,
      text: text,
      timestamp: Date.now(),
    });
}