import { socket } from '../common/socket';

export function initializeWebSockets() {

  socket.on('chatMessage-submitted', data => {
    console.log('web socket event')
    this.props.actions.submitChat(data.chatMessage);
  });

};

export function emitChatMessage(text,name){
  
  socket.emit('chatMessage-submitted', {
      username : name,
      text: text,
      timestamp: Date.now(),
    });
}