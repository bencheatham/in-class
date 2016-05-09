import { connectToWebSockets } from '../common/socket';

var socket;

export function initializeWebSockets() {
  socket = connectToWebSockets();

  socket.on('thumbCheck', () => {
    this.props.thumbActions.thumbCheck();
  });

  socket.on('thumb-student', data => {    
    this.props.actions.thumb(data.id,data.username,data.value);
  });
};

export function closeWebSockets(){
  socket.disconnect();
}

export function emitThumbEvent(value,name,id){
  socket = connectToWebSockets();
  
  socket.emit('thumb-student', {
      username : name,
      thumb: value,
      timestamp: Date.now(),
      id: id,
    });
  this.props.actions.submitThumb();
}

export function emitThumbCheck(username){
  socket.emit('thumbCheck', {username:username});
  this.props.thumbActions.openModal();
}